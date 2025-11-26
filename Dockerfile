FROM node:16.20.2 AS build-stage
WORKDIR /react-app
COPY react-app/package*.json ./

ENV REACT_APP_BASE_URL=http://localhost:5000
ENV PUBLIC_URL=https://trailsoftears-88ffdf9f4a82.herokuapp.com/
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY react-app/. .

RUN npm install
RUN npm run build


FROM python:3.9


ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir psycopg2-binary gunicorn

COPY . .
COPY --from=build-stage /react-app/build/* app/static/

CMD gunicorn app:app
