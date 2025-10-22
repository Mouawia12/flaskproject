import os
from datetime import timedelta

from flask import Flask,session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_login import LoginManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///noblepaints.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '526af4fbd93bc393a6392db7'
# Keep a configurable default admin password so deployments can recover access easily.
app.config['DEFAULT_ADMIN_PASSWORD'] = os.environ.get('DEFAULT_ADMIN_PASSWORD', '526af4fbd93bc393a6392db7')
# Allow larger uploads so the dashboard can accept sizeable media files.
# The previous 10 MiB ceiling was too restrictive for high-resolution assets.
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # Limit uploads to 100 MiB
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['MAIL_SERVER'] = 'mail.noblepaints.com.sa'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] ='info@noblepaints.com.sa'
#app.config['MAIL_PASSWORD'] = 'mzdkqpflejakjled'
app.config['MAIL_PASSWORD'] = 'm^_EHej(LNG.@@@#*@@@@@@'
mail = Mail(app)
ma = Marshmallow(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'warning'

from noblepaints import routes
