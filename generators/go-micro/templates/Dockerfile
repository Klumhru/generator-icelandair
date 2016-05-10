FROM node:5

COPY /dist /app
COPY /package.json /

WORKDIR /

RUN npm install --production --silent --no-progress

ENV NODE_ENV production

ENTRYPOINT ["node", "./app"]
