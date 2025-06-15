FROM node:18-alpine

WORKDIR /app

COPY ./services/user-service ./

RUN npm install

RUN yarn build

EXPOSE 3001
CMD ["node", "dist/app.js"]