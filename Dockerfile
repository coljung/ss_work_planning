FROM node:8.11
EXPOSE 80

ENV NPM_CONFIG_LOGLEVEL=warn

RUN mkdir /code
WORKDIR /code

COPY package.json .npmrc /code/
RUN npm set progress=false
RUN npm install --depth=0

COPY ./ /code

CMD ["npm", "start"]
