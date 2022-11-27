import express from 'express';
import { create, addProduct } from '../../Handlers/orderHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';
import orderStatus from '../../Middleware/Services/verifyOrderStatus';

const orders = express.Router();

orders.post('/neworder', verifyAuthToken, create);

orders.post('/orders/:id/product', verifyAuthToken, orderStatus, addProduct);

// need update order status function

// maybe delete order function too

export default orders;
