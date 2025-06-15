FROM node:18-alpine

WORKDIR /app

COPY ./services/lesson-service ./

RUN npm install

RUN yarn build

EXPOSE 3003
CMD ["node", "dist/app.js"]