import express from 'express';
import { create, addProduct, currentOrder, completedOrder } from '../../Handlers/orderHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';
import orderStatus from '../../Middleware/Services/verifyOrderStatus';

const orders = express.Router();

orders.post('/neworder', verifyAuthToken, create);

orders.post('/:id/product', verifyAuthToken, orderStatus, addProduct);

orders.get('/currentorder/:id', verifyAuthToken, currentOrder);

orders.get('/completedorder/id', verifyAuthToken, completedOrder);

// need update order status function

export default orders;
