from noblepaints import db,app,ma
from noblepaints import bcrypt

product_categorie = db.Table('product_categorie', db.Model.metadata,
    db.Column('category_id', db.Integer, db.ForeignKey('categories.category_id')),
    db.Column('product_id', db.Integer, db.ForeignKey('products.product_id'))
)

class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column('category_id',db.Integer, primary_key=True)
    name = db.Column(db.String())
    nameArabic = db.Column(db.String())
    desc = db.Column(db.String())
    img = db.Column(db.String())
    products = db.relationship("Product",secondary=product_categorie,lazy='dynamic',cascade='all, delete')

class Product(db.Model):
    __tablename__ = "products"
    id = db.Column('product_id',db.Integer, primary_key=True)
    img = db.Column(db.String())
    name = db.Column(db.String())
    desc = db.Column(db.String())
    country = db.Column(db.String())
    category = db.Column(db.String())
    lang = db.Column(db.String())
    datasheet = db.Column(db.String())

class Catalog(db.Model):
    __tablename__ = "catalogs"
    id = db.Column('catalog_id',db.Integer, primary_key=True)
    img = db.Column(db.String())
    name = db.Column(db.String())
    link = db.Column(db.String())
    category = db.Column(db.String())
    country = db.Column(db.String())
    lang = db.Column(db.String())

class TechnicalDatasheet(db.Model):
    __tablename__ = "technicalDatasheets"
    id = db.Column('technicalDatasheet_id',db.Integer, primary_key=True)
    name = db.Column(db.String())
    link = db.Column(db.String())
    category = db.Column(db.String())
    country = db.Column(db.String())
    lang = db.Column(db.String())

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    date = db.Column(db.String())
    lang = db.Column(db.String())
    img = db.Column(db.String())
    category = db.Column(db.String())
    views = db.Column(db.String())

class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    link = db.Column(db.String())
    img = db.Column(db.String())

class Approval(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    link = db.Column(db.String())
    img = db.Column(db.String())

class ProductSchema(ma.Schema):
    class Meta:
        Model=Product
        fields = ('id', 'img','name','desc','category','country','lang','datasheet')

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)

class Social(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    icon = db.Column(db.String())
    link = db.Column(db.String())

class SocialSchema(ma.Schema):
    class Meta:
        Model=Social
        fields = ('id', 'name','icon','link')