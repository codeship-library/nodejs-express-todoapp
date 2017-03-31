FROM node:7.7.2-slim

RUN apt-get update && apt-get install -f -y postgresql-client
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --quiet
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

WORKDIR /usr/app
COPY ./ /usr/app/
