FROM node:16.9.1-alpine AS base

WORKDIR /project

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/users-microservice/package*.json ./packages/users-microservice/
COPY ./packages/zefir-common/package*.json ./packages/zefir-common/

RUN yarn install

COPY ./packages/zefir-common ./packages/zefir-common
COPY ./packages/users-microservice ./packages/users-microservice

RUN yarn add glob rimraf -W
RUN yarn build:dep && yarn build

FROM node:16.9.1-alpine as production

WORKDIR /project

COPY ./package.json .
COPY ./yarn.lock .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=base /project/packages/zefir-common/package.json ./packages/zefir-common/
COPY --from=base /project/packages/users-microservice/package.json ./packages/users-microservice/
COPY --from=base /project/packages/zefir-common/dist ./packages/zefir-common/dist
COPY --from=base /project/packages/users-microservice/dist ./packages/users-microservice/dist

COPY --from=base /project/packages/users-microservice/.env* ./packages/users-microservice/

RUN yarn install --production

#COPY --from=base /project/node_modules ./node_modules
#COPY --from=base /project/packages/users-microservice/node_modules ./packages/users-microservice/node_modules
#COPY --from=base /project/packages/users-microservice/package.json ./packages/users-microservice/

WORKDIR /project/packages/users-microservice

EXPOSE 5050

CMD ["yarn", "run", "start:prod"]