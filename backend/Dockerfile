FROM node:20-alpine

WORKDIR /usr/app

RUN apk add --no-cache bash curl tzdata libc6-compat

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]