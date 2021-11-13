FROM node:latest

WORKDIR /app

COPY ./server ./

RUN npm i

EXPOSE 5000

CMD ["node", "index.js"]