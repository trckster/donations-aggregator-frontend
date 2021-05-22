FROM node:14

WORKDIR /usr/src/app

COPY . ./
RUN yarn

ENV HOST=0.0.0.0
ENV PORT=80

RUN yarn build

CMD [ "yarn", "start" ]
