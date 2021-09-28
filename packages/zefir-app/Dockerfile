# Install dependencies only when needed
FROM node:16.9.1-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apt-get update && apt-get install -y libc6-compat
WORKDIR /app
COPY ./packages/zefir-app/package.json ./packages/zefir-app/
COPY yarn.lock ./
COPY ./package.json ./
RUN yarn install --frozen-lockfile

COPY ./packages/zefir-app ./packages/zefir-app
RUN yarn build

# Production image, copy all the files and run next
FROM node:16.9.1-alpine3.11 AS runner
WORKDIR /app

COPY yarn.lock ./
COPY ./package.json ./

COPY ./packages/zefir-app/package.json ./packages/zefir-app/
RUN yarn install --production --ignore-scripts --prefer-offline

ENV NODE_ENV production

RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nextjs --uid 1001

# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=deps /app/next.config.js ./packages/zefir-app/
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/zefir-app/public ./packages/zefir-app/public
COPY --from=deps --chown=nextjs:nodejs /app/packages/zefir-app/.next ./packages/zefir-app/.next
COPY --from=deps /app/packages/zefir-app/node_modules ./packages/zefir-app/node_modules
COPY --from=deps /app/packages/zefir-app/package.json ./packages/zefir-app
COPY --from=deps /app/packages/zefir-app/.env* ./packages/zefir-app/

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app/packages/zefir-app

USER root

RUN apk add --no-cache bash

COPY ./scripts/wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh

USER nextjs

CMD ["./wait-for-it.sh", "--timeout=0", "-s", "zefir-backend:4000", "--", "yarn", "run", "start"]