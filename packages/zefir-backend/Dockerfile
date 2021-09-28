FROM node:16.9.1-alpine AS base

WORKDIR /project

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/zefir-backend/package.json ./packages/zefir-backend/

RUN yarn install

COPY ./packages/zefir-backend ./packages/zefir-backend

RUN yarn add glob rimraf -W
RUN yarn build

FROM node:16.9.1-alpine as production

WORKDIR /project

COPY ./package.json .
COPY ./yarn.lock .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ./packages/zefir-backend/package*.json ./packages/zefir-backend/

RUN yarn install --production

COPY --from=base /project/packages/zefir-backend/.env* ./packages/zefir-backend/
COPY --from=base /project/packages/zefir-backend/dist ./packages/zefir-backend/dist

WORKDIR /project/packages/zefir-backend

EXPOSE 4000

CMD ["yarn", "run", "start:prod"]