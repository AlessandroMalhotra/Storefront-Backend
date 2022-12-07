import express from 'express';
import { create, addProduct } from '../../Handlers/orderHandler';
import { currentOrder, completedOrder } from '../../Services/dashboardHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';
import orderStatus from '../../Middleware/OrderStatus/verifyOrderStatus';

const orders = express.Router();

orders.post('/neworder', verifyAuthToken, create);

orders.post('/:id/product', verifyAuthToken, orderStatus, addProduct);

orders.get('/currentorder/:id', verifyAuthToken, currentOrder);

orders.get('/completedorder/:id', verifyAuthToken, completedOrder);

// need update order status function

export default orders;
