FROM node:18.14.2

WORKDIR /app/posts

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9003

VOLUME [ "/node_modules" ]

CMD ["npm", "start"]