# Define the image to build from
FROM node:11-slim

# Create app directory
WORKDIR /var/redis-test

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY ./examples ./examples

# Bind to RedisSMQ Monitor on port 3000
EXPOSE 3000

CMD [ "node", "/var/redis-test/examples/producer-consumer/index.js" ]
