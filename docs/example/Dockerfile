FROM node:slim

ARG PACKAGE_NAME
ARG PACKAGE_VERSION
ARG YOUR_SECRET_TOKEN

ENV NODE_ENV="production"
COPY ./package.json ./package-lock.json /app/
WORKDIR /app
RUN npm install \
&& npm cache clean --force

COPY ./src ./src

ENTRYPOINT ["node", "/app/src/bin/main.js"]
CMD []
USER 1000
