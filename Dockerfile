# Create image based on the official Node 6 image from dockerhub
FROM node:6.11.1-alpine

# ENV MONGODB_URI=mongodb://local-mongod:27017/showroom

ENV SECRET_TOKEN=catswillruletheworld
# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY ./dist /usr/src/app

# COPY .env /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "docker-start"]