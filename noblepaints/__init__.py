from flask import Flask,session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_bcrypt import Bcrypt
from flask_mail import Mail

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///noblepaints.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '526af4fbd93bc393a6392db7'
app.config['PERMANENT_SESSION_LIFETIME']
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

from noblepaints import routes