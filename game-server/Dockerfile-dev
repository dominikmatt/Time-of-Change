FROM node:10.11-alpine
RUN mkdir -p /usr/src/game-server
COPY . ./package.json ./package-lock.json ./tsconfig.json /usr/src/game-server/

WORKDIR /usr/src/game-server

RUN npm install

ENV REDIS_HOST=redis

CMD ["npm", "run", "start:dev"]
