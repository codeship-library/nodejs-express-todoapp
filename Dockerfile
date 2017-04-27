FROM node:7.7.2-alpine

RUN apk update
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --quiet
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

WORKDIR /usr/app
COPY ./ /usr/app/
