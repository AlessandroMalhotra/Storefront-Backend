import express from 'express';
import { index, show, create } from '../../Handlers/productHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';
import { categoryProduct } from '../../Services/dashboardHandler';

const products = express.Router();

products.get('/', index);

products.get('/:id', show);

products.post('/newproduct', verifyAuthToken, create);

products.get('/productcategory/:category', categoryProduct);

export default products;
