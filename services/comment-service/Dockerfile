FROM node:18-alpine

WORKDIR /app

COPY ./services/comment-service ./

RUN npm install

RUN yarn build

EXPOSE 3004
CMD ["node", "dist/app.js"]