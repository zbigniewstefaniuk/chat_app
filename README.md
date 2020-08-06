# **Chat app - Sendy 💬**
It's chat app, implemented using Flask-SocketIO with both the database (PostgreSQL) and the app deployed in AWS. It also has user registration and authentication functionalities


APP IS STILL IN DEVELOPMENT STAGE BUT IT'S READY TO DEPLOY ON GUNICORN NGINX

![show-of-chat](https://github.com/zbigniewstefaniuk/zbigniewstefaniuk/blob/master/chat-screnn.png)
## **Description**
This app allows you to chat with other people. You can join any room and start typing!

Web Registration Page which use Postgresql for register and accessing users to Databse, it's connected with Heroku via URI
Password is protected with Hash function adding 16b salt and 29,000 iterations

## **CHANGELOG ./ DONE 👌🏻(05.07.2020)**

- Redis working with eventlet. Now you can chat! ✔

- registration with log in and out, made with flask-wtform and flask-sqlalchemy ✔

- chat funcionality with flask-socketio ✔

- automatic scrolling down when user send message, to show latest with JavaScript ✔

- added logout button on chat page ✔

- fixed not working rooms ✔

- fixed theme toggle button ✔

- added css code to stylize site and chat for better UI ✔

## **TO DO 💤**

- add nginx for makeing more people on chat

- mail validdation and confimation with flask-mail

- SLL certificate with load balancer on aws

- sending photos feature 

- responsive scaling page

- users img avatars

- showing active users 

- Direct Messages

**App is still at development stage ✌🏻 Stay tuned!**

Best Regards **Zayn!**
