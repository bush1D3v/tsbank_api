FROM oven/bun:1 as builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY swagger.json ./
COPY nodemon.json ./
COPY jest.config.js ./
COPY .env ./
COPY .env.test ./
COPY . .

RUN bun install

FROM builder AS final

COPY --from=builder /app /app

EXPOSE 3001

CMD ["bun", "dev"]
