import express from 'express';
import { index, show, create } from '../../Handlers/productHandler';

const products = express.Router();

products.get('/', index);

products.get('/:id', show);

products.post('/:name/:price/:category', create);

export default products;
