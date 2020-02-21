FROM node:8-alpine
WORKDIR /usr/src/app
RUN apk update && apk add git
COPY package*.json ./
RUN npm install
RUN npm install nodemon -g
COPY . .
CMD [ "npm", "start" ]
