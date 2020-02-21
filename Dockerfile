FROM node:8-alpine
WORKDIR /usr/src
RUN apk update && apk add git
RUN git clone https://github.com/leomastakusuma/trading-simulator
WORKDIR /usr/src/trading-simulator
RUN npm install
RUN npm install nodemon -g
CMD ["npm","start"]