FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY . .

RUN yarn install

FROM builder AS final

COPY --from=builder /app /app

EXPOSE 3001

CMD ["yarn", "dev"]
