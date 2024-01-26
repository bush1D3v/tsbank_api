FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY swagger.json ./
COPY nodemon.json ./
COPY jest.config.js ./
COPY .env ./
COPY .env.test ./
COPY . .

RUN npm install

FROM builder AS final

COPY --from=builder /app /app

EXPOSE 3001

CMD ["npm", "start"]
