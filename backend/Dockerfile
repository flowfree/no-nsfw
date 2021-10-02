FROM python:3.8-slim

WORKDIR /app

COPY . /app

RUN apt update -y && \
    apt install -y gcc libgl1 libgl-dev libglib2.0-0 libpq-dev && \
    pip install pipenv && \ 
    pipenv install 

CMD pipenv run ./manage.py runserver
