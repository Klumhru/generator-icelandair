FROM node:5

WORKDIR /usr/src
COPY /app /usr/src/app
COPY /package.json /usr/src/package.json
RUN npm install --no-progress --silent
