import express from 'express';
import { create, addProduct } from '../../Handlers/orderHandler';
import { currentOrder } from '../../Services/dashboardHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';
import verifyStatus from '../../Middleware/OrderStatus/verifyOrderStatus';

const orders = express.Router();

orders.post('/neworder', verifyAuthToken, create);

orders.post('/addproduct', verifyAuthToken, verifyStatus, addProduct);

orders.get('/orderstatus/:id/:status', verifyAuthToken, currentOrder);

// orders.get('orderstatus/:id/:status', verifyAuthToken, completedOrder);

export default orders;
