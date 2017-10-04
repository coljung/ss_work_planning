FROM node:7.0
EXPOSE 80

ENV NPM_CONFIG_LOGLEVEL=warn

RUN mkdir /code
WORKDIR /code

COPY package.json /code/
RUN npm set progress=false
RUN npm install --unsafe-perm=true --silent --depth 0

COPY ./ /code

CMD ["npm", "start"]