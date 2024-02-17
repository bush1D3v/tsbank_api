FROM node:21-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn install

FROM builder AS final

COPY --from=builder /app /app

EXPOSE 3001

CMD ["yarn", "dev"]
