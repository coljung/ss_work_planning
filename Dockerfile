FROM node:8.9
EXPOSE 80

ENV NPM_CONFIG_LOGLEVEL=warn

RUN mkdir /code
WORKDIR /code

COPY package.json .npmrc /code/
RUN npm set progress=false
RUN npm install --depth=0

COPY ./ /code

CMD ["npm", "start"]

# FROM node:8.9-alpine
#
# RUN mkdir /code
# WORKDIR /code
#
# # Force NODE_ENV build stage to be in development
# # ARG NODE_ENV=development
# ENV NODE_ENV development
# ENV NPM_CONFIG_LOGLEVEL=warn
#
# COPY package.json /code/
#
# RUN apk add --no-cache make gcc g++ python bash git openssh
#
# # install node packages
# RUN npm set progress=false && npm config set depth 0
#
# RUN NODE_ENV=development npm install --loglevel error
#
# CMD ["npm", "start"]
