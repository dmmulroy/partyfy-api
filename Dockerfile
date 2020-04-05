FROM node:latest

WORKDIR /partyfy

COPY package.json .

COPY package-lock.json .

COPY index.js .

COPY src/ ./src

RUN ["npm", "i"]

CMD ["npm", "start"]