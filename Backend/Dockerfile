FROM node:18-alpine
WORKDIR /src
ENV POSTGRES_HOST=localhost
ENV POSTGRES_DB=storefront
ENV POSTGRES_DB_TEST=store_front_test
ENV OSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
COPY package.json .
RUN npm install
RUN npm run build
COPY ./src /src
EXPOSE 3000
CMD ["npm","start"]