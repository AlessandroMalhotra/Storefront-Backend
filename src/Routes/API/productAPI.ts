import express from 'express';
import { ProductStore } from '../../Models/product';

const products = express.Router();
const productStore = new ProductStore();

products.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const product = await productStore.index();
    res.send(product);
  } catch (error) {
    res.send(`Cannot get users due to ${error}.`);
  }
});

products.get('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  const productId = Number(req.params.id);
  console.log(productId);

  try {
    const product = await productStore.show(productId);

    res.send(product);
  } catch (error) {
    res.send(`Cannot get user by id ${productId}, ${error}.`);
  }
});