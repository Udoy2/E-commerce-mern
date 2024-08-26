FROM node:18-alpine

WORKDIR /server

COPY . .
RUN npm install -g nodemon
RUN npm install

EXPOSE 8000

CMD ["npm","run","dev"]
