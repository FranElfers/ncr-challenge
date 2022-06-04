FROM node:alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./index.js ./

COPY ./clients.js ./

ENV PORT 3001

EXPOSE $PORT

CMD ["npm","start"]