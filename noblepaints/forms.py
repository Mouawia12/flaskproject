from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField
from wtforms.validators import  Length, EqualTo, Email, DataRequired, ValidationError
from noblepaints.models import User
from noblepaints import db

class  RegisterForm(FlaskForm):
    def validate_username(self,username_to_check):
        user = User.query.filter_by(username = username_to_check.data).first()
        if user:
            raise ValidationError('The Username Is Taken | اسم المستخدم مستخدم من قبل')
    def validate_email_address(self,email_address_to_check):
        email = User.query.filter_by(email_address = email_address_to_check.data).first()
        
        if email:
            if email.auth == 'true':
                raise ValidationError('The Email Is Already Used | البريد الإلكتروني مستخدم من قبل')
            else:
                db.session.delete(db.session.query(User).filter(User.email_address==email_address_to_check.data).first())
                db.session.commit()
    username = StringField(label='username',validators = [Length(min=2,max=30),DataRequired()])
    email_address = StringField(label='email',validators = [Email(),DataRequired()])
    password1 = PasswordField(label='password1',validators = [Length(min=6),DataRequired()])
    password2 = PasswordField(label='password2',validators = [EqualTo('password1'),DataRequired()])
    realName1 = StringField(label='name',validators = [DataRequired()])
    realName2 = StringField(label='name',validators = [DataRequired()])
    name = StringField(label='name')
    phone = IntegerField(label='phone',validators = [DataRequired()])
    location1 = StringField(label='location1')
    location2 = StringField(label='location2')
    location3 = StringField(label='location3')
    location4 = StringField(label='location4')
    submit = SubmitField(label='submit')

class  LoginForm(FlaskForm):
    username = StringField(label='username',validators = [DataRequired()])
    password = PasswordField(label='password',validators = [DataRequired()])
    submit = SubmitField(label='submit')

class  RequestResetForm(FlaskForm):
    email_address = StringField(label='email',validators = [Email(),DataRequired()])
    submit = SubmitField(label='submit')
    def validate_email_address(self,email_address_to_check):
        email = User.query.filter_by(email_address = email_address_to_check.data).first()
        if email is None:
            raise ValidationError('Your Email Don\'t exist | البريد الإلكتروني غير مسجل لدينا')

class  ResetPasswordForm(FlaskForm):
    password1 = PasswordField(label='password1',validators = [Length(min=6),DataRequired()])
    password2 = PasswordField(label='password2',validators = [EqualTo('password1'),DataRequired()])
    submit = SubmitField(label='submit')

class  ScreenForm(FlaskForm):
    name = StringField(label='name',validators = [DataRequired()])
    submit = SubmitField(label='submit')