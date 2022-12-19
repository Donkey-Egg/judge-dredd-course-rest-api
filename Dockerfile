FROM node:18.12.1-alpine as base
WORKDIR /opt/donkeyegg/course

FROM base as src
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --production
COPY src src

EXPOSE 3000

ENTRYPOINT [ "node", "src/index.js" ]