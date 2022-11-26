import express from 'express';
import { index, show, create } from '../../Handlers/productHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';

const products = express.Router();

products.get('/', index);

products.get('/productid', show);

products.post('/newproduct', verifyAuthToken, create);

products.get('/productcategory', 'dashboard file');

export default products;
