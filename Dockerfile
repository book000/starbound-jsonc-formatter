FROM node:14

RUN yarn

ENTRYPOINT [ "yarn", "run", "build" ]