FROM node:18.14.2

WORKDIR /app/category

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9002

VOLUME [ "/node_modules" ]

CMD ["npm", "start"]