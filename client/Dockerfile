# Use an official Node.js runtime as the base image
FROM node:18.14.2
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY ./public /app/public

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
VOLUME [ "/node_modules" ]


CMD ["npm","run", "dev"]
