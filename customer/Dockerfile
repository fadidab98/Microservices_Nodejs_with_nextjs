FROM node:18.14.2

WORKDIR /app/customer

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9001

VOLUME [ "/node_modules" ]

CMD ["npm", "start"]