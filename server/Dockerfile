FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install -g nodemon
RUN npm install

EXPOSE 8000

CMD ["npm","run","dev"]
