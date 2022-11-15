import express from 'express';
import { index, show } from '../../Handlers/productHandler';
const products = express.Router();

products.get('/', index);

products.get('/:id', show);

export default products;