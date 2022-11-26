import express from 'express';
import users from './API/userAPI';
import products from './API/productAPI';
import orders from './API/orderAPI';

const router = express.Router();

router.use('/users', users);

router.use('/products', products);

router.use('/orders', orders);

export default router;
