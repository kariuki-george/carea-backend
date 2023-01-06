FROM node:16-slim AS deps
RUN apt-get update
RUN apt-get install -y openssl libssl-dev


WORKDIR /usr/src/app


COPY prisma ./prisma/


COPY package.json ./

RUN yarn add glob rimraf

RUN yarn --only=development

COPY . .

RUN yarn build

FROM --platform=linux/amd64 node:fermium-alpine3.16 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN  yarn  --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]