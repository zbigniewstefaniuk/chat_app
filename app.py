# Standard library import
from time import localtime, strftime

# Flask Imports
from flask import Flask, render_template, redirect, url_for, flash
from passlib.hash import pbkdf2_sha256
from flask_login import LoginManager, login_user, current_user, login_required, logout_user, UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, send, emit, join_room, leave_room

import redis

# File Imports

from wtform_fields import RegistrationForm, LoginForm
from models import User

# app
app = Flask(__name__)
app.secret_key = 'Nvy"t!87Q16X2e98~XnO'

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://mxkojocwksvdug:4940d37aebb6dc9897c14b69bcf8b348a8bd81238c7db05dfb8297cce6ebbc02@ec2-176-34-97-213.eu-west-1.compute.amazonaws.com:5432/d1lr7tc79bumen'
db = SQLAlchemy(app)

# Flask-login
login = LoginManager(app)
login.init_app(app)

# Flask-SocketIO
#socketio = SocketIO(app, manage_session=False, message_queue="redis://redis") #with redis for deploy
socketio = SocketIO(app, manage_session=False) # witohut redis for development purposes
ROOMS = ['Lobby', 'Main']


@login.user_loader
def load_user(id):

    return User.query.get(int(id))


@app.route('/', methods=['GET', 'POST'])
def index():

    reg_form = RegistrationForm()

    # Updated database if validation success
    if reg_form.validate_on_submit():
        username = reg_form.username.data
        password = reg_form.password.data

        # This hash adding 16b salt and 29,000 iterations by default
        hashed_pswd = pbkdf2_sha256.hash(password)

        # Adding user to db
        user = User(username=username, password=hashed_pswd)
        db.session.add(user)
        db.session.commit()

        # showing notification on site
        flash('Registered seccusfully! Please login :)', 'success')

        return redirect(url_for('login'))

    return render_template('index.html', form=reg_form)


@app.route('/login', methods=['GET', 'POST'])
def login():

    login_form = LoginForm()

    # Allow login if validation success
    if login_form.validate_on_submit():
        user_object = User.query.filter_by(
            username=login_form.username.data).first()
        login_user(user_object)
        return redirect(url_for('chat'))

    return render_template('login.html', form=login_form)


@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if not current_user.is_authenticated:

        # showing notification on site after ',' is category parameter for css
        # wchih can be called anyway 'danger' is in bootsrtap
        flash('Please login!', 'danger')

        return redirect(url_for('login'))

    return render_template('chat.html', username=current_user.username, rooms=ROOMS)


@app.route('/logout', methods=['GET'])
def logout():

    logout_user()
    flash('You have logged out sucessfully! ', 'success')

    return redirect(url_for('login'))


@app.errorhandler(404)
def page_not_found(e):
    # just and basic 404
    return render_template('404.html'), 404


@socketio.on('message')
def message(data):
    
    username = data["username"]
    msg = data["msg"]
    room = data["room"]

    send({'msg': msg, 'username': username, 'time_stamp':
          strftime('%b-%d %X', localtime())}, room=room)


@socketio.on('join')
def join(data):

    username = data["username"]
    room = data["room"]

    join_room(data['room'])
    send({"msg": username + " has joined the " + room + " room"},
     room=room)


@socketio.on('leave')
def leave(data):

    username = data['username']
    room = data['room']

    leave_room(room)
    send({"msg": username + " has left the room"}, room=room)



if __name__ == '__main__':
    socketio.run(app, debug=True)
