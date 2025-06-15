FROM node:18-alpine

WORKDIR /app

COPY ./services/course-service ./

RUN npm install

RUN yarn build

EXPOSE 3002
CMD ["node", "dist/app.js"]