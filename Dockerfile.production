FROM node:8.11-alpine as base

RUN mkdir /code
WORKDIR /code

# Force NODE_ENV build stage to be in development
# ARG NODE_ENV=development
ENV NODE_ENV development
ENV NPM_CONFIG_LOGLEVEL=warn

COPY package.json /code/

#
# ---- Dependencies ----
FROM base AS dependencies

WORKDIR /code
COPY . /code

# RUN apk add --no-cache make gcc g++ python git
# RUN apk update && apk upgrade && \
#     apk add --no-cache make gcc g++ python bash git openssh
RUN apk add --no-cache make gcc g++ python bash git openssh

# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production --loglevel error
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install --loglevel error

# build
RUN npm run build

RUN apk del make gcc g++ python bash git openssh

#
# ---- Release ----
FROM base AS release
# copy app sources
COPY . /code

# copy production node_modules
COPY --from=dependencies /code/prod_node_modules /code/node_modules
COPY --from=dependencies /code/build /code/build

RUN rm -rf ./app
RUN rm -rf ./scripts
RUN rm -rf ./tests

CMD ["npm", "start"]
