from flask_wtf import FlaskForm

from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, EqualTo, ValidationError
from passlib.hash import pbkdf2_sha256

from models import User


def invalid_credentials(form, field):
    """ Username and Password Checker """

    username_entered = form.username.data
    password_entered = field.data

    # Check credentials are valid
    user_data = User.query.filter_by(username=username_entered).first()
    if user_data is None:
        raise ValidationError("Username or password is incorrect")
    elif not pbkdf2_sha256.verify(password_entered, user_data.password):
        raise ValidationError("Username or password is incorrect")

# REGISTER

class RegistrationForm(FlaskForm):
    """ Registration Form """

    username = StringField('username_label',
        validators=[InputRequired(message="Username required"),
        Length(min=6, max=30, message="Username must be between 6 and 30 characters")])
    password = PasswordField('password_label',
        validators=[InputRequired(message="Password required"),
        Length(min=6, max=30, message="Password must be between 6 and 30 characters")])
    confirm_passd = PasswordField('confirm_passd_label',
        validators=[InputRequired(message="Password required"),
        EqualTo('password', message="Passwords have to match")])
    submit_button = SubmitField('Create')

    # Check username exists
    def validate_username(self, username):
        user_object = User.query.filter_by(username=username.data).first()
        if user_object:
            raise ValidationError("Username already exists. Chose different userrname.")

# LOGIN

class LoginForm(FlaskForm):
    """ Login Form """

    username = StringField('username_label',
        validators=[InputRequired(message="Username required")])
    password = PasswordField('password_label',
        validators=[InputRequired(message="Password required"),
        invalid_credentials])
    submit_button = SubmitField('Login')     