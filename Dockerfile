FROM node:16

WORKDIR /app

COPY /server/package.json .

RUN npm install

COPY /server ./

ENV PORT 3001

EXPOSE $PORT

CMD ["npm", "start"]