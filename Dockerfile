# syntax=docker/dockerfile:1

FROM node:16.14.2
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
COPY ["client/package.json", "client/package-lock.json", "./client/"]

RUN npm install --development
RUN npm install --development --prefix client

COPY . .

CMD [ "npm", "run", "dev" ]