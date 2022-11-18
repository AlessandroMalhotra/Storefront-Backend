import express from 'express';
import { index, show, create } from '../../Handlers/productHandler';
import verifyAuthToken from '../../Middleware/verifyToken';

const products = express.Router();

products.get('/', index);

products.get('/:id', show);

products.post('/:name/:price/:category', verifyAuthToken, create);

export default products;
