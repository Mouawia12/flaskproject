from noblepaints import app,mail,db,login_manager
from datetime import datetime
import math
import time
from io import BytesIO
import os
from urllib.parse import urlparse
from sqlalchemy import insert, desc, func
from sqlalchemy.orm import noload
import pathlib
import requests
from flask import (
    g,
    render_template,
    request,
    jsonify,
    send_from_directory,
    redirect,
    url_for,
    flash,
    session,
    abort,
    make_response,
    Response,
    send_file,
    json,
)
from flask_login import login_user, logout_user, login_required, current_user
from noblepaints.forms import LoginForm
from noblepaints.models import (
    Category,
    Product,
    Catalog,
    TechnicalDatasheet,
    Post,
    Certificate,
    Approval,
    ProductSchema,
    Upload,
    SocialSchema,
    Social,
    User,
)
from noblepaints.i18n import (
    AVAILABLE_LANGUAGES,
    get_translation,
    serialise_translations,
)
from functools import lru_cache
from flask_mail import Message


FEATURED_PRODUCT_IDS = (
    68,
    71,
    78,
    80,
    36,
    20,
    113,
    64,
    104,
    76,
)


def _normalise_lang(candidate):
    if candidate in AVAILABLE_LANGUAGES:
        return candidate
    return "en"


def _get_featured_products_for_lang(lang):
    lang = _normalise_lang(lang)
    search_order = [lang]
    if lang != "en":
        search_order.append("en")

    collected = {}
    for code in search_order:
        rows = (
            db.session.query(Product)
            .filter(Product.lang == code, Product.id.in_(FEATURED_PRODUCT_IDS))
            .all()
        )
        for row in rows:
            collected.setdefault(row.id, row)

    ordered = [collected[pid] for pid in FEATURED_PRODUCT_IDS if pid in collected]
    return ordered


def _get_latest_products_for_lang(lang, limit=6):
    lang = _normalise_lang(lang)
    search_order = [lang]
    if lang != "en":
        search_order.append("en")

    latest = []
    seen_ids = set()

    for code in search_order:
        query = (
            db.session.query(Product)
            .filter(Product.lang == code)
            .order_by(Product.id.desc())
        )
        if limit:
            query = query.limit(limit * 2)
        for product in query:
            if product.id in seen_ids:
                continue
            latest.append(product)
            seen_ids.add(product.id)
            if len(latest) >= limit:
                break
        if len(latest) >= limit:
            break

    return latest[:limit]
# Initialize database tables once at startup
with app.app_context():
    db.create_all()
    # Add database indexes for better performance
    try:
        # Create indexes if they don't exist (SQLite compatible)
        db.engine.execute('CREATE INDEX IF NOT EXISTS idx_categories_id ON categories(category_id)')
        db.engine.execute('CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)')
        db.engine.execute('CREATE INDEX IF NOT EXISTS idx_products_lang ON products(lang)')
        db.engine.execute('CREATE INDEX IF NOT EXISTS idx_catalogs_lang ON catalogs(lang)')
        db.engine.execute('CREATE INDEX IF NOT EXISTS idx_catalogs_category ON catalogs(category)')
        print("Database indexes created/verified for better performance")
    except Exception as e:
        print(f"Note: Could not create indexes (may already exist): {e}")
    try:
        default_username = os.environ.get('ADMIN_INITIAL_USERNAME', 'admin')
        configured_password = os.environ.get('ADMIN_INITIAL_PASSWORD') or app.config.get('DEFAULT_ADMIN_PASSWORD')
        fallback_password = configured_password or 'ChangeMe123!'
        existing_admin = db.session.query(User).filter(func.lower(User.username) == default_username.lower()).first()
        if not existing_admin:
            admin_user = User(username=default_username, full_name='Administrator')
            admin_user.set_password(fallback_password)
            db.session.add(admin_user)
            db.session.commit()
            if configured_password:
                print(f"Created default admin user '{default_username}' using configured credentials.")
            else:
                print(f"Created default admin user '{default_username}' with fallback password '{fallback_password}'. Change it immediately.")
        elif configured_password and not existing_admin.check_password(configured_password):
            existing_admin.set_password(configured_password)
            db.session.commit()
            print(f"Updated default admin user '{default_username}' password from configuration.")
    except Exception as e:
        print(f"Could not ensure default admin user: {e}")
# Cache will be pre-warmed after function definitions
#pip install Flask-HTTPAuth
#pip install email_validator
#pip install flask_bcrypt
#pip install flask_login
#pip install flask-mail
#pip install itsdangerous==2.0.1
#Authlib==0.14.3
#os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app.secret_key = os.environ.get('SECRET_KEY', 'change-me-please')
@login_manager.user_loader
def load_user(user_id):
    try:
        return db.session.get(User, int(user_id))
    except (TypeError, ValueError):
        return None
def _resolve_language_from_request():
    """Determine the active language for the current request."""
    candidate = request.args.get('lang')
    if candidate in AVAILABLE_LANGUAGES:
        return candidate
    stored = session.get('lang')
    if stored in AVAILABLE_LANGUAGES:
        return stored
    return 'en'
@app.before_request
def _set_language_context():
    lang = _resolve_language_from_request()
    session['lang'] = lang
    g.current_lang = lang
@app.context_processor
def inject_layout_helpers():
    current_lang = getattr(g, 'current_lang', 'en')
    def url_for_lang(endpoint, **values):
        values.setdefault('lang', current_lang)
        return url_for(endpoint, **values)
    def switch_lang_url(lang_code):
        try:
            endpoint = request.endpoint or 'home_page'
            values = dict(request.view_args or {})
            query_args = request.args.to_dict()
        except RuntimeError:
            endpoint = 'home_page'
            values = {}
            query_args = {}
        values.update(query_args)
        values['lang'] = lang_code
        return url_for(endpoint, **values)
    def translate(key, default=None):
        return get_translation(key, current_lang, default)
    return {
        'current_lang': current_lang,
        'available_languages': AVAILABLE_LANGUAGES,
        'url_for_lang': url_for_lang,
        'switch_lang_url': switch_lang_url,
        't': translate,
        'base_translations': serialise_translations(),
    }


def json_success(message='OK', status=200, **extra):
    """Create a standard JSON success response."""
    payload = {'success': True}
    if message is not None:
        payload['message'] = message
    if extra:
        payload.update(extra)
    return jsonify(payload), status


def json_error(message, status=400, **extra):
    """Create a standard JSON error response."""
    payload = {'success': False, 'message': message}
    if extra:
        payload.update(extra)
    return jsonify(payload), status
# create download function for download files
@app.route('/download/<upload_id>')
def download(upload_id):
    upload = Upload.query.filter_by(id=upload_id).first()
    return send_file(BytesIO(upload.data),
                     download_name=upload.filename, as_attachment=True)
@app.route('/show/<upload_id>/')
def show_static_pdf(upload_id):
    upload = Upload.query.filter_by(id=upload_id).first()
    pdf = BytesIO()
    pdf.write(upload.data)
    pdf.seek(0)
    return send_file(pdf, as_attachment=False, mimetype='application/pdf')
@app.route('/home')
@app.route('/en/')
@app.route('/ar/')
@app.route('/')
def home_page():
    lang = _normalise_lang(getattr(g, 'current_lang', 'en'))
    featured = _get_featured_products_for_lang(lang)
    latest = _get_latest_products_for_lang(lang)
    return render_template('index.html', featured_products=featured, latest_products=latest)
@app.route('/ral-colors/')
def ralColors():
    return render_template('RalColors.html')
@app.route('/video')
def get_video():  
    def generate():
        with open("/flask/noblepaints/static/videos/1.mp4", "rb") as f:
            data = f.read(1024)
            while data:
                yield data
                data = f.read(1024)
    return Response(generate(), mimetype="video/mp4", headers={"Accept-Ranges": "bytes"})
@app.route('/sendC/', methods=["POST", "GET"])
def sendC():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    required_fields = ['type', 'name', 'phone']
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        return json_error(
            f"Missing required fields: {', '.join(missing)}",
            status=400
        )

    msg = Message(
        data["type"],
        sender="noreply@demo.com",
        recipients=["info@noblepaints.com.sa"],
    )
    msg.body = (
        ":Noble Paints Customers:\n"
        f"Name: {data.get('name')}\n"
        f"Company Name: {data.get('comp', '')}\n"
        f"Phone: {data.get('phone')}\n"
        f"Message: {data.get('message', '')}\n"
    )
    try:
        mail.send(msg)
    except Exception as exc:
        app.logger.exception("Failed to send contact form email: %s", exc)
        return json_error('Unable to send message right now.', status=500)

    return json_success('Message sent successfully.')


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('cpanel_categories', page=1))

    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data.strip().lower()
        user = db.session.query(User).filter(func.lower(User.username) == username).first()
        if user and user.is_active and user.check_password(form.password.data):
            login_user(user, remember=True)
            flash(get_translation('auth.login.success', getattr(g, 'current_lang', 'en'), 'Welcome back!'), 'success')
            next_url = request.args.get('next')
            if next_url and urlparse(next_url).netloc == '':
                return redirect(next_url)
            return redirect(url_for('cpanel_categories', page=1))
        flash(get_translation('auth.login.error', getattr(g, 'current_lang', 'en'), 'Incorrect username or password.'), 'danger')

    return render_template('auth/login.html', form=form)


@app.route('/logout/')
@login_required
def logout():
    logout_user()
    flash(get_translation('auth.logout.success', getattr(g, 'current_lang', 'en'), 'Signed out successfully.'), 'info')
    return redirect(url_for('login'))
@app.route('/about/')
def about_page():  
        return render_template('about.html')
@app.route('/calculator/')
def calculator_page():  
        return render_template('calculator.html')
@app.route('/socialMedia/')
def socialMedia_page():  
        return render_template('social.html')
@app.route('/products/')
def products_page():  
        return render_template('products.html')
@app.route('/product/')
def product_page():
        id = request.args.get('id')  
        product = db.session.query(Product).filter(Product.id==id).first()
        if not product:
            abort(404)
        # Get similar products in same category, excluding current product
        similar = db.session.query(Product).filter(
            Product.category==product.category,
            Product.id != id
        ).limit(6).all()
        return render_template('product.html', product=product, similar=similar)
@app.route('/FindStore/')
def locations_page():  
        return render_template('locations.html')
@app.route('/colors/')
def colors_page():  
        return render_template('colors.html')
@app.route('/contact/')
def contact_page():  
        return render_template('contact.html')
# Categories cache - simple in-memory cache for categories
categories_cache = {
    'data': None,
    'timestamp': 0,  # Force refresh on next load
    'ttl': 300  # Cache for 5 minutes
}


def invalidate_categories_cache():
    """Clear the cached categories so subsequent requests fetch fresh data."""
    categories_cache['data'] = None
    categories_cache['timestamp'] = 0
def get_cached_categories():
    """Get categories with caching to reduce database load - OPTIMIZED VERSION"""
    current_time = time.time()
    # Check if cache is valid
    if (categories_cache['data'] is not None and 
        current_time - categories_cache['timestamp'] < categories_cache['ttl']):
        print(f"Returning cached categories: {len(categories_cache['data'])} items")
        return categories_cache['data']
    try:
        print("Fetching categories from database...")
        # SUPER OPTIMIZED query: include img field for proper image loading
        categories = db.session.query(
            Category.id, 
            Category.name, 
            Category.nameArabic, 
            Category.desc,
            Category.img
        ).filter(
            Category.id != 29
        ).order_by(Category.id).all()
        print(f"Database returned {len(categories)} categories")
        # Convert to lightweight dictionary format
        categories_list = []
        for cat in categories:
            # Use img directly from query result - debug what we're getting
            img_url = cat.img if cat.img else '/static/images/default.png'
            print(f"Category {cat.id} ({cat.name}): img = '{cat.img}'")  # Debug line
            categories_list.append({
                'id': cat.id,
                'name': cat.name or 'Untitled',
                'nameArabic': cat.nameArabic or cat.name or 'غير محدد',
                'desc': cat.desc or 'No description available.',
                'img': img_url
            })
        # Update cache
        categories_cache['data'] = categories_list
        categories_cache['timestamp'] = current_time
        print(f"Cached {len(categories_list)} categories with optimized data")
        return categories_list
    except Exception as e:
        print(f"Database error in get_cached_categories: {e}")
        # Return cached data if available, even if stale
        if categories_cache['data'] is not None:
            print(f"Returning stale cached data: {len(categories_cache['data'])} items")
            return categories_cache['data']
        # Last resort: return minimal structure
        print("No cached data available, returning minimal fallback")
        return [
            {'id': 0, 'name': 'Loading...', 'nameArabic': 'جاري التحميل...', 'desc': 'Please wait', 'img': '/static/images/loading.gif'}
        ]
@app.route('/categories/')
def categories_page():
    """Categories page - optimized hybrid approach with fallback"""
    try:
        # Get categories with minimal data first for fast page load
        categories = get_cached_categories()
        print(f"Categories page: got {len(categories)} categories for fallback")
        # Return page immediately with cached data - AJAX will enhance if needed
        response = make_response(render_template('categories.html', categories=categories, template='cats'))
        # Add caching headers for better performance
        response.headers['Cache-Control'] = 'public, max-age=300'  # Cache for 5 minutes
        response.headers['ETag'] = f'categories-{len(categories)}-{int(categories_cache["timestamp"])}'
        return response
    except Exception as e:
        print(f"Error in categories_page: {e}")
        # Return minimal page structure if there's an error
        response = make_response(render_template('categories.html', categories=[], template='cats'))
        response.headers['Cache-Control'] = 'public, max-age=60'  # Shorter cache for errors
        return response
@app.route('/api/categories/')
def api_categories():
    """API endpoint for loading categories asynchronously - OPTIMIZED"""
    try:
        # Check if client has cached version using ETag
        if_none_match = request.headers.get('If-None-Match')
        current_etag = f'api-categories-{int(categories_cache.get("timestamp", 0))}'
        if if_none_match == current_etag:
            # Client has current version, return 304 Not Modified
            return '', 304
        categories = get_cached_categories()
        # For API, include actual image URLs for better UX
        enhanced_categories = []
        for cat in categories:
            enhanced_cat = cat.copy()
            # Only load actual images via API to avoid blocking initial page load
            if cat['id'] != 0:  # Skip loading indicator
                try:
                    # Get actual image from database only when requested via API
                    actual_cat = db.session.query(Category.img).filter(Category.id == cat['id']).first()
                    enhanced_cat['img'] = actual_cat.img if actual_cat and actual_cat.img else '/static/images/default-category.jpg'
                except:
                    enhanced_cat['img'] = '/static/images/default-category.jpg'
            enhanced_categories.append(enhanced_cat)
        response_data = {
            'categories': enhanced_categories,
            'count': len(enhanced_categories),
            'cached': categories_cache['timestamp'] > 0,
            'success': True,
            'timestamp': int(time.time())
        }
        response = jsonify(response_data)
        # Add caching headers
        response.headers['Cache-Control'] = 'public, max-age=300'
        response.headers['ETag'] = current_etag
        print(f"API Categories: Returning {len(enhanced_categories)} categories with images")
        return response
    except Exception as e:
        print(f"Error in api_categories: {e}")
        return jsonify({
            'categories': [],
            'count': 0,
            'cached': False,
            'success': False,
            'error': 'Failed to load categories',
            'timestamp': int(time.time())
        }), 500
@app.route('/news/')
def news_page():  
    page = request.args.get('page')
    type = request.args.get('type') 
    lang = getattr(g, 'current_lang', 'en')
    if(page !='' and page !='undefined' and page != None):
        if(type !='' and type !='undefined' and type != None):
            return render_template('news.html',news = db.session.query(Post).filter(Post.type==type,Post.lang==lang),page=page,type=type)
        else:
            return render_template('news.html',news = db.session.query(Post).filter(Post.lang==lang).all(),page=page,type=type)
    else:
        if(type !='' and type !='undefined' and type != None):
            return render_template('news.html',news = db.session.query(Post).filter(Post.type==type,Post.lang==lang),page='1',type=type)
        else:
            return render_template('news.html',news = db.session.query(Post).filter(Post.lang==lang).all(),page='1',type=type)
@app.route('/certificates/')
def certificates_page():  
    page = request.args.get('page')
    type = request.args.get('type') 
    if(page !='' and page !='undefined' and page != None):
        if(type !='' and type !='undefined' and type != None):
            return render_template('certificates.html',certificates = db.session.query(Certificate).filter(Certificate.type==type),page=page,type=type)
        else:
            return render_template('certificates.html',certificates = db.session.query(Certificate).all(),page=page,type=type)
    else:
        if(type !='' and type !='undefined' and type != None):
            return render_template('certificates.html',certificates = db.session.query(Certificate).filter(Certificate.type==type),page='1',type=type)
        else:
            return render_template('certificates.html',certificates = db.session.query(Certificate).all(),page='1',type=type)
@app.route('/approvals/')
def approvals_page():  
    page = request.args.get('page')
    type = request.args.get('type') 
    if(page !='' and page !='undefined' and page != None):
        if(type !='' and type !='undefined' and type != None):
            return render_template('approvals.html',approvals = db.session.query(Certificate).filter(Certificate.type==type),page=page,type=type)
        else:
            return render_template('approvals.html',approvals = db.session.query(Certificate).all(),page=page,type=type)
    else:
        if(type !='' and type !='undefined' and type != None):
            return render_template('approvals.html',approvals = db.session.query(Certificate).filter(Certificate.type==type),page='1',type=type)
        else:
            return render_template('approvals.html',approvals = db.session.query(Certificate).all(),page='1',type=type)
@app.route('/news/<id>/')
def news_page_details(id):  
    lang = getattr(g, 'current_lang', 'en')
    # Single query to get the post
    post = db.session.query(Post).filter(Post.id==id).first()
    if not post:
        abort(404)
    # Update views efficiently
    if post.views:
        post.views = int(post.views) + 1
    else:
        post.views = '1'
    db.session.commit()
    # Optimize queries with limits
    latest = db.session.query(Post).filter(Post.lang==lang).limit(5).all()
    allNews = Post.query.order_by(desc(Post.views)).filter(Post.lang==lang).limit(10).all()
    return render_template('news_details.html',
        post=post,
        latest=latest,
        allNews=allNews
    )
@app.route('/products/<cat>/')
def products_cat_page(cat):
        category = db.session.query(Product).filter(Product.category==cat)
        if category:
            return render_template('products_cat.html',
            items=category.all(),
            title=cat,                   
            )
        else:
            return render_template('products_cat.html',
            title="kids",                    
            )
@app.route('/productsSearch/')
def productsSearch_page_filter_none():  
    cat = request.args.get('category')
    page = request.args.get('page')
    search = request.args.get('search')
    country = request.args.get('country')
    #lang = request.args.get('lang')
    lang = 'en'
    if search == None or search == "null" or search == "":
        if country == "All" or country == None or country == "null" or country == "":
            if page == None or page == "null":
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.lang==lang,Product.name.contains("")).all(),
                        page="1",
                        category="All",
                        search="",
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.category==cat,Product.lang==lang,Product.name.contains("")).all(),
                        page="1",
                        category=cat,
                        search="",
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
            else:
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.lang==lang,Product.lang==lang,Product.name.contains("")).all(),
                        page=page,
                        category="All",
                        search="",
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                        )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.category==cat,Product.lang==lang,Product.name.contains("")).all(),
                        page=page,
                        category=cat,
                        search="",
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
        else:
            if page == None or page == "null":
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains("")).all(),
                        page="1",
                        category="All",
                        search="",
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains("")).all(),
                        page="1",
                        category=cat,
                        search="",
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
            else:
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains("")).all(),
                        page=page,
                        category="All",
                        search="",
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains("")).all(),
                        page=page,
                        category=cat,
                        search="",
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
    else:
        if country == "All" or country == None or country == "null" or country == "":
            if page == None or page == "null":
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.lang==lang,Product.name.contains(search)).all(),
                        page="1",
                        category="All",
                        search=search,
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.category==cat,Product.lang==lang,Product.name.contains(search)).all(),
                        page="1",
                        category=cat,
                        search=search,
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
            else:
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.lang==lang,Product.name.contains(search)).all(),
                        page=page,
                        category="All",
                        search=search,
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                        )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.category==cat,Product.lang==lang,Product.name.contains(search)).all(),
                        page=page,
                        category=cat,
                        search=search,
                        country="All",
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
        else:
            if page == None or page == "null":
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains(search)).all(),
                        page="1",
                        category="All",
                        search=search,
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains(search)).all(),
                        page="1",
                        category=cat,
                        search=search,
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
            else:
                if cat == "All" or cat == None or cat == "null":
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains(search)).all(),
                        page=page,
                        category="All",
                        search=search,
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
                else:
                    return render_template('productsSearch.html',items = db.session.query(Product).filter(Product.country==country,Product.lang==lang,Product.name.contains(search)).all(),
                        page=page,
                        category=cat,
                        search=search,
                        country=country,
                        categories = db.session.query(Category).all(),
                        template = 'products'
                    )
@app.route('/catalogs/')
def catalogs_page_filter_none():  
    try:
        cat = request.args.get('category', 'All')
        search = request.args.get('search', '').strip()
        country = request.args.get('country', 'All')
        lang = getattr(g, 'current_lang', 'en')
        try:
            page = int(request.args.get('page', 1))
            if page < 1:
                page = 1
        except (ValueError, TypeError):
            page = 1
        items_per_page = 12
        query = db.session.query(Catalog).filter(Catalog.lang == lang)
        if cat and cat not in ('All', 'null'):
            query = query.filter(Catalog.category == cat)
        if country and country not in ('All', 'null'):
            query = query.filter(Catalog.country == country)
        if search:
            search_value = f"%{search.lower()}%"
            query = query.filter(func.lower(Catalog.name).like(search_value))
        query = query.order_by(desc(Catalog.id))
        total_items = query.count()
        total_pages = max(1, math.ceil(total_items / items_per_page)) if total_items else 1
        if page > total_pages:
            page = total_pages
        offset = (page - 1) * items_per_page
        items = query.offset(offset).limit(items_per_page).all()
        categories_query = db.session.query(Catalog.category).filter(Catalog.lang == lang).distinct()
        catalog_categories = sorted([row[0] for row in categories_query if row[0]])
        countries_query = db.session.query(Catalog.country).filter(Catalog.lang == lang).distinct()
        catalog_countries = sorted([row[0] for row in countries_query if row[0]])
        window_start = max(1, page - 2)
        window_end = min(total_pages, page + 2)
        page_numbers = list(range(window_start, window_end + 1))
        return render_template(
            'catalogs.html',
            items=items,
            total_items=total_items,
            page=page,
            total_pages=total_pages,
            page_numbers=page_numbers,
            category=cat,
            search=search,
            country=country,
            template='catalogs',
            items_per_page=items_per_page,
            catalog_categories=catalog_categories,
            catalog_countries=catalog_countries,
            lang=lang
        )
    except Exception as e:
        print(f"Error in catalogs route: {e}")
        try:
            items = db.session.query(Catalog).filter(Catalog.lang == 'en').order_by(desc(Catalog.id)).limit(12).all()
            return render_template(
                'catalogs.html',
                items=items,
                total_items=len(items),
                page=1,
                total_pages=1,
                page_numbers=[1],
                category="All",
                search="",
                country="All",
                template='catalogs',
                items_per_page=12,
                catalog_categories=[],
                catalog_countries=[],
                lang='en'
            )
        except Exception as fallback_error:
            print(f"Fallback error: {fallback_error}")
            return "Internal server error in catalogs page", 500
@app.route('/TechnicalDatasheets/')
def TechnicalDatasheets_page_filter_none():  
    try:
        # Get filter parameters with proper defaults and validation
        cat = request.args.get('category', 'All')
        search = request.args.get('search', '').strip()
        country = request.args.get('country', 'All')
        lang = 'en'
        # Handle page parameter safely
        try:
            page = int(request.args.get('page', 1))
            if page < 1:
                page = 1
        except (ValueError, TypeError):
            page = 1
        # Build base query for Products (TechnicalDatasheets uses Product model)
        query = db.session.query(Product).filter(Product.lang == lang)
        # Apply filters conditionally
        if cat and cat != 'All' and cat != 'null':
            query = query.filter(Product.category == cat)
        if country and country != 'All' and country != 'null':
            query = query.filter(Product.country == country)
        if search:
            query = query.filter(Product.name.contains(search))
        # Get total count for pagination
        total_items = query.count()
        # Apply pagination - only get items for current page
        items_per_page = 12
        offset = (page - 1) * items_per_page
        items = query.offset(offset).limit(items_per_page).all()
        # Get categories once
        categories = db.session.query(Category).all()
        return render_template('TechnicalDatasheets.html',
            items=items,
            total_items=total_items,
            page=str(page),
            category=cat,
            search=search,
            country=country,
            categories=categories,
            items_per_page=items_per_page
        )
    except Exception as e:
        # Fallback to basic functionality if something goes wrong
        print(f"Error in TechnicalDatasheets route: {e}")
        try:
            # Simple fallback query
            items = db.session.query(Product).filter(Product.lang == 'en').limit(12).all()
            categories = db.session.query(Category).all()
            return render_template('TechnicalDatasheets.html',
                items=items,
                total_items=len(items),
                page="1",
                category="All", 
                search="",
                country="All",
                categories=categories,
                items_per_page=12
            )
        except Exception as fallback_error:
            print(f"TechnicalDatasheets fallback error: {fallback_error}")
            return "Internal server error in TechnicalDatasheets page", 500
################################################
@app.route('/ControlPanel/socialIcons/')
@login_required
def cpanel_socialIcons():
    page = request.args.get('page')
    show = request.args.get('show')
    if show:
        return render_template('cpanel_socialIcons.html',socialIcons = db.session.query(Social).all(),page=page,show=show)
    else:
        return render_template('cpanel_socialIcons.html',socialIcons = db.session.query(Social).all(),page=page,show='10')
@app.route('/ControlPanel/socialIcons/add/',methods=['POST','GET'])
@login_required
def socialIcons_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    link = (data.get('link') or '').strip()
    icon = (data.get('icon') or '').strip()
    if not link or not icon:
        return json_error('Link and icon are required fields.')

    s1 = Social(link=link, icon=icon)
    db.session.add(s1)
    db.session.commit()
    return json_success('Social icon created successfully.', status=201, id=s1.id)
@app.route('/ControlPanel/socialIcons/edit/<id>/',methods=['POST','GET'])
@login_required
def socialIcons_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    social = db.session.query(Social).filter(Social.id == id).first()
    if not social:
        return json_error('Social icon not found.', status=404)

    data = request.get_json(silent=True) or {}
    link = data.get('link')
    icon = data.get('icon')
    if link and link != 'undefined':
        social.link = link.strip()
    if icon and icon != 'undefined':
        social.icon = icon.strip()
    db.session.commit()
    return json_success('Social icon updated successfully.')
@app.route('/ControlPanel/socialIcons/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def socialIcons_del(id):
    social = db.session.query(Social).filter(Social.id == id).first()
    if not social:
        return json_error('Social icon not found.', status=404)

    db.session.delete(social)
    db.session.commit()
    return json_success('Social icon deleted successfully.')
###################################################
@app.route('/ControlPanel/news/')
@login_required
def cpanel_news():
    page = request.args.get('page')
    show = request.args.get('show')
    lang = request.args.get('lang') or getattr(g, 'current_lang', 'en')
    if show:
        return render_template('cpanel_news.html',news = db.session.query(Post).filter(Post.lang==lang).all(),page=page,show=show)
    else:
        return render_template('cpanel_news.html',news = db.session.query(Post).filter(Post.lang==lang).all(),page=page,show='10')
@app.route('/ControlPanel/news/add/',methods=['POST','GET'])
@login_required
def news_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    title = (data.get('title') or '').strip()
    description = (data.get('description') or '').strip()
    lang = (data.get('lang') or '').strip() or getattr(g, 'current_lang', 'en')
    if not title or not description:
        return json_error('Title and description are required.')

    post = Post(
        title=title,
        img=data.get('img'),
        description=description,
        lang=lang,
        date=data.get('date'),
    )
    db.session.add(post)
    db.session.commit()
    return json_success('News item created successfully.', status=201, id=post.id)
@app.route('/ControlPanel/news/edit/<id>/',methods=['POST','GET'])
@login_required
def news_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    post = db.session.query(Post).filter(Post.id == id).first()
    if not post:
        return json_error('News item not found.', status=404)

    data = request.get_json(silent=True) or {}
    title = data.get('title')
    description = data.get('description')
    date = data.get('date')
    img = data.get('img')
    lang = data.get('lang')
    if title and title != 'undefined':
        post.title = title.strip()
    if description and description != 'undefined':
        post.description = description.strip()
    if date and date != 'undefined':
        post.date = date
    if img and img != 'undefined':
        post.img = img
    if lang and lang != 'undefined':
        post.lang = lang.strip()

    db.session.commit()
    return json_success('News item updated successfully.')
@app.route('/ControlPanel/news/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def news_del(id):
    post = db.session.query(Post).filter(Post.id == id).first()
    if not post:
        return json_error('News item not found.', status=404)

    db.session.delete(post)
    db.session.commit()
    return json_success('News item deleted successfully.')
################################################
@app.route('/ControlPanel/certificates/')
@login_required
def cpanel_certificates():
    page = request.args.get('page')
    show = request.args.get('show')
    if show:
        return render_template('cpanel_certificates.html',certificates = db.session.query(Certificate).all(),page=page,show=show)
    else:
        return render_template('cpanel_certificates.html',certificates = db.session.query(Certificate).all(),page=page,show='10')
@app.route('/ControlPanel/certificates/add/',methods=['POST','GET'])
@login_required
def certificates_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    title = (data.get('title') or '').strip()
    description = (data.get('description') or '').strip()
    if not title or not description:
        return json_error('Title and description are required.')

    certificate = Certificate(
        title=title,
        img=data.get('img'),
        description=description,
        link=data.get('link'),
    )
    db.session.add(certificate)
    db.session.commit()
    return json_success('Certificate created successfully.', status=201, id=certificate.id)
@app.route('/ControlPanel/certificates/edit/<id>/',methods=['POST','GET'])
@login_required
def certificates_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    certificate = db.session.query(Certificate).filter(Certificate.id == id).first()
    if not certificate:
        return json_error('Certificate not found.', status=404)

    data = request.get_json(silent=True) or {}
    title = data.get('title')
    description = data.get('description')
    link = data.get('link')
    img = data.get('img')
    if title and title != 'undefined':
        certificate.title = title.strip()
    if description and description != 'undefined':
        certificate.description = description.strip()
    if link and link != 'undefined':
        certificate.link = link
    if img and img != 'undefined':
        certificate.img = img

    db.session.commit()
    return json_success('Certificate updated successfully.')
@app.route('/ControlPanel/certificates/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def certificates_del(id):
    certificate = db.session.query(Certificate).filter(Certificate.id == id).first()
    if not certificate:
        return json_error('Certificate not found.', status=404)

    db.session.delete(certificate)
    db.session.commit()
    return json_success('Certificate deleted successfully.')
###############################################
@app.route('/ControlPanel/approvals/')
@login_required
def cpanel_approvals():
    page = request.args.get('page')
    show = request.args.get('show')
    if show:
        return render_template('cpanel_approvals.html',approvals = db.session.query(Approval).all(),page=page,show=show)
    else:
        return render_template('cpanel_approvals.html',approvals = db.session.query(Approval).all(),page=page,show='10')
@app.route('/ControlPanel/approvals/add/',methods=['POST','GET'])
@login_required
def approvals_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    title = (data.get('title') or '').strip()
    description = (data.get('description') or '').strip()
    if not title or not description:
        return json_error('Title and description are required.')

    approval = Approval(
        title=title,
        img=data.get('img'),
        description=description,
        link=data.get('link'),
    )
    db.session.add(approval)
    db.session.commit()
    return json_success('Approval created successfully.', status=201, id=approval.id)
@app.route('/ControlPanel/approvals/edit/<id>/',methods=['POST','GET'])
@login_required
def approvals_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    approval = db.session.query(Approval).filter(Approval.id == id).first()
    if not approval:
        return json_error('Approval not found.', status=404)

    data = request.get_json(silent=True) or {}
    title = data.get('title')
    description = data.get('description')
    link = data.get('link')
    img = data.get('img')
    if title and title != 'undefined':
        approval.title = title.strip()
    if description and description != 'undefined':
        approval.description = description.strip()
    if link and link != 'undefined':
        approval.link = link
    if img and img != 'undefined':
        approval.img = img

    db.session.commit()
    return json_success('Approval updated successfully.')
@app.route('/ControlPanel/approvals/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def approvals_del(id):
    approval = db.session.query(Approval).filter(Approval.id == id).first()
    if not approval:
        return json_error('Approval not found.', status=404)

    db.session.delete(approval)
    db.session.commit()
    return json_success('Approval deleted successfully.')
################################################
@app.route('/ControlPanel/products/')
@login_required
def cpanel_products():
    page = request.args.get('page')
    show = request.args.get('show')
    #lang = request.args.get('lang')
    lang = 'en'
    if show:
        return render_template('cpanel_products.html',products = db.session.query(Product).filter(Product.lang==lang).all(),page=page,show=show,categories = db.session.query(Category).all(),)
    else:
        return render_template('cpanel_products.html',products = db.session.query(Product).filter(Product.lang==lang).all(),page=page,show='10',categories = db.session.query(Category).all(),)
@app.route('/ControlPanel/products/add/',methods=['POST','GET'])
@login_required
def products_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    if 'data' not in request.form:
        return json_error('Missing product data payload.')

    data = json.loads(request.form['data'])
    name = (data.get('name') or '').strip()
    desc = (data.get('desc') or '').strip()
    if not name or not desc:
        return json_error('Name and description are required.')

    img = data.get('img')
    category = data.get('category')
    country = data.get('country')
    lang = data.get('lang') or 'en'

    datasheet_id = ""
    if request.files:
        datasheet = request.files.get('file')
        if datasheet and datasheet.filename:
            upload = Upload(filename=datasheet.filename, data=datasheet.read())
            db.session.add(upload)
            db.session.commit()
            datasheet_id = upload.id

    product = Product(
        name=name,
        img=img,
        desc=desc,
        category=category,
        country=country,
        lang=lang,
        datasheet=datasheet_id,
    )
    db.session.add(product)
    db.session.commit()
    return json_success('Product created successfully.', status=201, id=product.id)
@app.route('/ControlPanel/products/edit/<id>/',methods=['POST','GET'])
@login_required
def products_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    product = db.session.query(Product).filter(Product.id == id).first()
    if not product:
        return json_error('Product not found.', status=404)

    if 'data' not in request.form:
        return json_error('Missing product data payload.')

    data = json.loads(request.form['data'])
    name = data.get('name')
    img = data.get('img')
    desc = data.get('desc')
    category = data.get('category')
    country = data.get('country')
    lang = data.get('lang')

    if request.files:
        datasheet = request.files.get('file')
        if datasheet and datasheet.filename and datasheet != 'undefined':
            upload = db.session.query(Upload).filter(Upload.id == product.datasheet).first()
            if upload:
                upload.filename = datasheet.filename
                upload.data = datasheet.read()
            else:
                upload = Upload(filename=datasheet.filename, data=datasheet.read())
                db.session.add(upload)
                db.session.commit()
                product.datasheet = upload.id

    if name and name != 'undefined':
        product.name = name.strip()
    if desc and desc != 'undefined':
        product.desc = desc.strip()
    if category and category != 'undefined':
        product.category = category
    if country and country != 'undefined':
        product.country = country
    if lang and lang != 'undefined':
        product.lang = lang
    if img and img != 'undefined':
        product.img = img

    db.session.commit()
    return json_success('Product updated successfully.')
@app.route('/ControlPanel/products/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def products_del(id):
    product = db.session.query(Product).filter(Product.id == id).first()
    if not product:
        return json_error('Product not found.', status=404)

    db.session.delete(product)
    db.session.commit()
    return json_success('Product deleted successfully.')
################################################
@app.route('/ControlPanel/catalogs/')
@login_required
def cpanel_catalogs():
    page = request.args.get('page')
    show = request.args.get('show')
    #lang = request.args.get('lang')
    lang = 'en'
    if show:
        return render_template('cpanel_catalogs.html',catalogs = db.session.query(Catalog).filter(Catalog.lang==lang).all(),page=page,show=show,categories = db.session.query(Category).all(),)
    else:
        return render_template('cpanel_catalogs.html',catalogs = db.session.query(Catalog).filter(Catalog.lang==lang).all(),page=page,show='10',categories = db.session.query(Category).all(),)
@app.route('/ControlPanel/catalogs/add/',methods=['POST','GET'])
@login_required
def catalogs_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data_payload = request.form.get('data', '')
    if not data_payload:
        return json_error('Missing catalog data payload.')

    try:
        data = json.loads(data_payload)
    except (TypeError, ValueError):
        return json_error('Invalid catalog data payload.', status=400)

    name = (data.get('name') or '').strip()
    img = data.get('img')
    category = (data.get('category') or '').strip() or None
    lang = (data.get('lang') or getattr(g, 'current_lang', 'en')).strip() or 'en'
    country = (data.get('country') or '').strip() or None
    if not name:
        return json_error('Catalog name is required.')

    file_obj = request.files.get('file')
    if not file_obj or not file_obj.filename:
        return json_error('Catalog file upload is required.')

    try:
        upload = Upload(filename=file_obj.filename, data=file_obj.read())
        db.session.add(upload)
        db.session.flush()

        catalog = Catalog(
            name=name,
            img=(img.strip() if isinstance(img, str) and img.strip() else None),
            link=upload.id,
            category=category,
            country=country,
            lang=lang,
        )
        db.session.add(catalog)
        db.session.commit()
    except Exception as exc:
        db.session.rollback()
        app.logger.exception('Failed to create catalog', exc_info=exc)
        return json_error('Failed to create catalog. Please try again later.', status=500)

    return json_success('Catalog created successfully.', status=201, id=catalog.id)
@app.route('/ControlPanel/catalogs/edit/<id>/',methods=['POST','GET'])
@login_required
def catalogs_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    catalog = db.session.query(Catalog).filter(Catalog.id == id).first()
    if not catalog:
        return json_error('Catalog not found.', status=404)

    if 'data' not in request.form:
        return json_error('Missing catalog data payload.')

    data = json.loads(request.form['data'])
    name = data.get('name')
    img = data.get('img')
    category = data.get('category')
    lang = data.get('lang')
    country = data.get('country')

    if request.files:
        link = request.files.get('file')
        if link and link.filename and link != 'undefined':
            upload = db.session.query(Upload).filter(Upload.id == catalog.link).first()
            if upload:
                upload.filename = link.filename
                upload.data = link.read()
            else:
                upload = Upload(filename=link.filename, data=link.read())
                db.session.add(upload)
                db.session.commit()
                catalog.link = upload.id

    if name and name != 'undefined':
        catalog.name = name.strip()
    if category and category != 'undefined':
        catalog.category = category
    if country and country != 'undefined':
        catalog.country = country
    if lang and lang != 'undefined':
        catalog.lang = lang
    if img and img != 'undefined':
        catalog.img = img

    db.session.commit()
    return json_success('Catalog updated successfully.')
@app.route('/ControlPanel/catalogs/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def catalogs_del(id):
    catalog = db.session.query(Catalog).filter(Catalog.id == id).first()
    if not catalog:
        return json_error('Catalog not found.', status=404)

    db.session.delete(catalog)
    db.session.commit()
    return json_success('Catalog deleted successfully.')
####################################################
@app.route('/ControlPanel/TechnicalDatasheets/')
@login_required
def cpanel_TechnicalDatasheets():
    page = request.args.get('page')
    show = request.args.get('show')
    #lang = request.args.get('lang')
    lang = 'en'
    if show:
        return render_template('cpanel_TechnicalDatasheets.html',TechnicalDatasheets = db.session.query(TechnicalDatasheet).filter(TechnicalDatasheet.lang==lang).all(),page=page,show=show,categories = db.session.query(Category).all(),)
    else:
        return render_template('cpanel_TechnicalDatasheets.html',TechnicalDatasheets = db.session.query(TechnicalDatasheet).filter(TechnicalDatasheet.lang==lang).all(),page=page,show='10',categories = db.session.query(Category).all(),)
@app.route('/ControlPanel/TechnicalDatasheets/add/',methods=['POST','GET'])
@login_required
def TechnicalDatasheets_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    link = data.get('link')
    category = data.get('category')
    country = data.get('country')
    lang = data.get('lang') or 'en'
    if not name or not link:
        return json_error('Name and link are required.')

    datasheet = TechnicalDatasheet(
        name=name,
        link=link,
        category=category,
        country=country,
        lang=lang,
    )
    db.session.add(datasheet)
    db.session.commit()
    return json_success('Technical datasheet created successfully.', status=201, id=datasheet.id)
@app.route('/ControlPanel/TechnicalDatasheets/edit/<id>/',methods=['POST','GET'])
@login_required
def TechnicalDatasheets_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    datasheet = db.session.query(TechnicalDatasheet).filter(TechnicalDatasheet.id == id).first()
    if not datasheet:
        return json_error('Technical datasheet not found.', status=404)

    data = request.get_json(silent=True) or {}
    name = data.get('name')
    link = data.get('link')
    category = data.get('category')
    country = data.get('country')
    lang = data.get('lang')

    if name and name != 'undefined':
        datasheet.name = name.strip()
    if link and link != 'undefined':
        datasheet.link = link
    if category and category != 'undefined':
        datasheet.category = category
    if country and country != 'undefined':
        datasheet.country = country
    if lang and lang != 'undefined':
        datasheet.lang = lang

    db.session.commit()
    return json_success('Technical datasheet updated successfully.')
@app.route('/ControlPanel/TechnicalDatasheets/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def TechnicalDatasheets_del(id):
    datasheet = db.session.query(TechnicalDatasheet).filter(TechnicalDatasheet.id == id).first()
    if not datasheet:
        return json_error('Technical datasheet not found.', status=404)

    db.session.delete(datasheet)
    db.session.commit()
    return json_success('Technical datasheet deleted successfully.')
####################################################
@app.route('/ControlPanel/')
@app.route('/ControlPanel/categories/')
@login_required
def cpanel_categories():
    page = request.args.get('page')
    show = request.args.get('show')
    if page:
        if show:
            return render_template('cpanel_categories.html',categories = db.session.query(Category).all(),page=page,show=show)
        else:
            return render_template('cpanel_categories.html',categories = db.session.query(Category).all(),page=page,show='10')
    else:
        if show:
            return render_template('cpanel_categories.html',categories = db.session.query(Category).all(),page='1',show=show)
        else:
            return render_template('cpanel_categories.html',categories = db.session.query(Category).all(),page='1',show='10')
@app.route('/ControlPanel/categories/add/',methods=['POST','GET'])
@login_required
def categories_add():
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    desc = (data.get('desc') or '').strip()
    if not name or not desc:
        return json_error('Name and description are required.')

    category = Category(
        name=name,
        img=data.get('img'),
        desc=desc,
        nameArabic=data.get('namearabic'),
    )
    db.session.add(category)
    db.session.commit()
    invalidate_categories_cache()
    return json_success('Category created successfully.', status=201, id=category.id)
@app.route('/ControlPanel/categories/edit/<id>/',methods=['POST','GET'])
@login_required
def categories_edit(id):
    if request.method != 'POST':
        return json_error('Method not allowed', status=405)

    category = db.session.query(Category).filter(Category.id == id).first()
    if not category:
        return json_error('Category not found.', status=404)

    data = request.get_json(silent=True) or {}
    name = data.get('name')
    desc = data.get('desc')
    name_arabic = data.get('namearabic')
    img = data.get('img')

    if name and name != 'undefined':
        category.name = name.strip()
    if desc and desc != 'undefined':
        category.desc = desc.strip()
    if name_arabic and name_arabic != 'undefined':
        category.nameArabic = name_arabic.strip()
    if img and img != 'undefined':
        category.img = img

    db.session.commit()
    invalidate_categories_cache()
    return json_success('Category updated successfully.')
@app.route('/ControlPanel/categories/del/<id>/', methods=['DELETE', 'POST', 'GET'])
@login_required
def categories_del(id):
    category = db.session.query(Category).filter(Category.id == id).first()
    if not category:
        return json_error('Category not found.', status=404)

    db.session.delete(category)
    db.session.commit()
    invalidate_categories_cache()
    return json_success('Category deleted successfully.')
@app.route('/getProducts/')
def get_products():
    lang = request.args.get('lang') or getattr(g, 'current_lang', None)
    lang = _normalise_lang(lang)
    limit = request.args.get('limit', type=int)

    query = db.session.query(Product).filter(Product.lang == lang).order_by(Product.id.desc())
    if limit:
        query = query.limit(limit)

    products = query.all()
    schema = ProductSchema(many=True)
    return jsonify(schema.dump(products))
@app.route('/getsocialIcons/')
def getsocialIcons():
    y = db.session.query(Social).all()
    x = SocialSchema(many=True)
    z = x.dump(y)
    return jsonify(z)
################################################################
# Performance: Pre-warm the categories cache on startup
try:
    with app.app_context():
        print("Pre-warming categories cache...")
        get_cached_categories()
        print("Categories cache pre-warmed successfully")
except Exception as e:
    print(f"Could not pre-warm categories cache: {e}")
