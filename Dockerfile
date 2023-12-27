## Install dependencies only when needed
FROM node:18-alpine AS builder

WORKDIR /app

COPY . ./

ARG BUILD_ENV
ENV BUILD_ENV=${BUILD_ENV}
RUN apk add --no-cache libc6-compat

RUN rm -rf package-lock.json \
    && echo "BUILD_ENV - ${BUILD_ENV}" \
    && start_counter="$(date +%s)" && echo "[Info] start_counter ..... $start_counter" \
    && chmod -R 775 ./.next \
    && end_counter="$(date +%s)" && echo "[Info] end_counter ..... $end_counter" \
    && SKIP_HUSKY=1 yarn install \
    && yarn build

RUN start_counter=$(date +%s) && echo "[Info] start_counter ..... $start_counter" \
    && end_counter="$(date +%s)" && echo "[Info] end_counter ..... $end_counter" \
    && yarn cache clean --all && rm -rf ./.next/cache && rm -rf ./.yarn \
    && rm -rf node_modules/ 


FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

## You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --production --ignore-scripts \
    && yarn cache clean --all && rm -rf ./.next/cache && rm -rf ./.yarn \
    && ls -la \
    && ls -la .next/ && ls -la .next/static/chunks/

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
