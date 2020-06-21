FROM python:3.7

RUN mkdir app && cd app
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install psycopg2-binary 
RUN pip install gunicorn

COPY static ./static
COPY templates ./templates
COPY *.py ./

EXPOSE 80

CMD gunicorn --worker-class eventlet -w 1 --worker-tmp-dir /dev/shm -b 0.0.0.0:80 app:app
