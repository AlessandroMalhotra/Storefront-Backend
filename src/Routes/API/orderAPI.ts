import express from 'express';
import { create, addProduct } from '../../Handlers/orderHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';

const orders = express.Router();

orders.post('/neworder', verifyAuthToken, create);

orders.post('/orders/:id/product', verifyAuthToken, addProduct);

// need update order status function

// maybe delete order function too
