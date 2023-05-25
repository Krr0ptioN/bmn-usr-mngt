FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
COPY src .
COPY prisma ./prisma/

RUN npm ci


ENTRYPOINT [ "npm", "start" ]
