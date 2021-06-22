FROM node:14

WORKDIR /usr/src/app

COPY . ./
RUN yarn

ENV HOST=0.0.0.0
ENV PORT=80

ARG PUSHER_APP_KEY
ARG BROADCAST_AUTH_URL

RUN yarn build

CMD [ "yarn", "start" ]
