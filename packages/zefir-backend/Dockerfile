FROM node:16.9.1-alpine AS base

WORKDIR /project

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/zefir-backend/package.json ./packages/zefir-backend/
COPY ./packages/zefir-common/package.json ./packages/zefir-common/

RUN yarn install

COPY ./packages/zefir-common ./packages/zefir-common
COPY ./packages/zefir-backend ./packages/zefir-backend

RUN yarn add glob rimraf -W
RUN yarn build

FROM node:16.9.1-alpine as production

WORKDIR /project

COPY ./package.json .
COPY ./yarn.lock .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ./packages/zefir-common/package*.json ./packages/zefir-common/
COPY ./packages/zefir-backend/package*.json ./packages/zefir-backend/

RUN yarn install --production

COPY --from=base /project/node_modules ./node_modules
COPY --from=base /project/packages/zefir-backend/.env* ./packages/zefir-backend/
COPY --from=base /project/packages/zefir-backend/dist ./packages/zefir-backend/dist
COPY --from=base /project/packages/zefir-backend/node_modules ./packages/zefir-backend/node_modules
COPY --from=base /project/packages/zefir-backend/package.json ./packages/zefir-backend/

WORKDIR /project/packages/zefir-backend

EXPOSE 4000

CMD ["yarn", "run", "start:prod"]