FROM node:18.14.2

WORKDIR /app/cart

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9004

VOLUME [ "/node_modules" ]

CMD ["npm", "run", "dev"]