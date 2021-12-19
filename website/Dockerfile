FROM node:16

WORKDIR /app

COPY package*.json ./
COPY public/ public/
COPY tsconfig.json ./
COPY src/ src/

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "serve" ]
