# Base image
FROM node:15
COPY ./dist /workspace
COPY ./package.json /workspace
COPY ./.env /workspace
WORKDIR /workspace
RUN yarn cache clean
RUN yarn install
EXPOSE 5010

CMD [ "yarn","run","start:docker" ]
