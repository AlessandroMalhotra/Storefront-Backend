import express from 'express';
import users from './API/userAPI';
import products from './API/productAPI';

const router = express.Router();

router.use('/users', users);

router.use('/products', products);

export default router;
