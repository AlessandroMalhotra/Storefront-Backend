import express from 'express';
import { index, show, create } from '../../Handlers/productHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';

const products = express.Router();

products.get('/', index);

products.get('/id', show);

products.post('/newproduct', verifyAuthToken, create);

export default products;
