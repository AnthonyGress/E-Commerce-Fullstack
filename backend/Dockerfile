# Build Container
FROM  node:lts-slim as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Deploy Container
FROM node:lts-slim as deploy
RUN  apt-get upgrade -y
ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=base /usr/src/app/build ./build

EXPOSE 3000
EXPOSE 5432

CMD [ "node", "build/index.js" ]