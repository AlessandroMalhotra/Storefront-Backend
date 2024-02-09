FROM node:18-alpine
WORKDIR /backend

COPY . .

RUN npm install
RUN npm run build

CMD ["npm","start"]