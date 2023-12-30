FROM python:3.9.18-slim-bullseye
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
RUN echo "PG_PASSWORD=postgres" > ./quip/.env
# RUN python ./quip/manage.py migrate
CMD python ./quip/manage.py runserver 0.0.0.0:8000
