FROM node:18-alpine
WORKDIR /backend
ENV POSTGRES_HOST=localhost
ENV POSTGRES_DB=storefront
ENV POSTGRES_DB_TEST=store_front_test
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]