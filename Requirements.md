# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Need to add role based access to some of the routes for example create, show index users only admin and create a product only admin 

## API Endpoints
#### Products
- Index Done
- Show Done
- Create [token required] - Done 
- [OPTIONAL] Products by category (args: product category) - Done

#### Users
- Index [token required] Done 
- Show [token required] Done
- Create user N[token required] Done
- Sign in/Sign up - Done
#### Orders
- add product to active order - Done 
- Current Order by user (args: user id)[token required] - Done
- [OPTIONAL] Completed Orders by user (args: user id)[token required] - Done 

## Data Shapes
#### Product - Done
-  id
- name
- price
- [OPTIONAL] category

#### User - Done
- id
- firstName
- lastName
- password

#### Orders - Done
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
