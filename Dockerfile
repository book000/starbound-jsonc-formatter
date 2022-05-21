FROM node:14

COPY . .

RUN yarn

ENTRYPOINT [ "yarn", "run", "build" ]