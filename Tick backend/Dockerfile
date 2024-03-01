ARG PYTHON_VERSION=3.11-slim-buster

FROM python:${PYTHON_VERSION}
RUN useradd -ms /bin/bash funpass

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN mkdir -p /home/funpass/code
RUN chown -R funpass:funpass /home/funpass/code/
USER funpass

WORKDIR /home/funpass/code

COPY requirements.txt /tmp/requirements.txt
ENV PATH="${PATH}:/home/funpass/.local/bin"
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt

COPY . .

USER root
RUN chown -R funpass:funpass /home/funpass/code/
USER funpass
RUN python manage.py collectstatic --noinput
RUN python manage.py makemigrations --noinput
RUN python3 manage.py migrate --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "TICKETS.wsgi"]

