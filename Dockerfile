FROM node

WORKDIR /app

COPY package*.json ./
COPY swagger.json ./
COPY nodemon.json ./
COPY jest.config.js ./
COPY .env ./
COPY .env.test ./
COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
