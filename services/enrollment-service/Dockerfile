FROM node:18-alpine

WORKDIR /app

COPY ./services/enrollment-service ./

RUN npm install

RUN yarn build

EXPOSE 3005
CMD ["node", "dist/app.js"]