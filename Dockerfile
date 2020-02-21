FROM node:8-alpine
RUN apk update && apk add git
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install nodemon -g
COPY . .
CMD [ "npm", "start" ]
