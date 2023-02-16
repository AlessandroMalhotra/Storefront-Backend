# Storefront Backend Project

This project aims to build a RESTful JSON API for creating an online retail store.
This storefront backend is powered by a Postgres database to store products, users and orders.
This application implements password hashing and JWTs.

## Technologies used

This application makes use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Instructions for setting up and running project


## Install packages 
```
 npm install
```

## .ENV file 
```
Add a .env file with the following variables:

POSTGRES_HOST = localhost
POSTGRES_DB = storefront
POSTGRES_DB_TEST = store_front_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = postgres
ENV = dev
PORT = 3000
HOST = 127.0.0.1
BCRYPT_PASSWORD = P4$$w0rD
SALT_ROUNDS = 9 
SECRET = mastery
```
## Database setup
```
To create the database, use psql to run: CREATE DATABASE storefront;
To create the tables, run: db-migrate up 

Tables are prepopulated with the following;
- Admin user - username: admin, password: admin. This is because to create a user a token is required so admin user is prepopulated
- 1 product - For tests
- 1 order - For tests
```
## Database Scheme 
```
Users Table            Product Table          Orders                 Order_Products             
Column       Types     Column       Types     Column      Types      Column         Types
- id         integer   - id         integer   - id        integer    - id           integer
- firstName  char      - name       char      - status    char       - quantity     integer
- lastName   char      - price      integer   - user_id   bigint     - order_id     bigint
- password   text      - category   char                             - product_id   bigint
- username   char      - quantity   integer
- admin      boolean
```
## Starting the App
```
- Run npm ; npm run start
- navigate to http://127.0.0.1:3000/
- Then navigate to http://127.0.0.1:3000/users/signin - Use username: admin, password: admin to get a JWT.
- Testing using npm run test
```
## Endpoints
```
- Host and Port - http://127.0.0.1:3000/
#### users
- /users [GET] -> index() [Token required]
- /users/:id [GET] -> show() [Token required]
- /users/createuser [POST] -> create() [Token required]
- /users/signin [POST] -> signin()
#### products
- /products [GET] -> index()
- /products/:id [GET] -> show()
- /products/newproduct [POST] -> create() [Token required]
#### orders
- /orders/neworder [POST] -> create() [Token required]
- /orders/addproduct [POST] -> addProduct() [Token required]
#### dahsboars queries
- /products/productcategory/:category[GET] -> productsbycategury() [Token required]
- /orders//orderstatus/:id/:status[GET] -> activeorderforuser() [Token required]
```
