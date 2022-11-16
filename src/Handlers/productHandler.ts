import express from 'express';
import { ProductStore, Product } from '../Models/product';

const productStore = new ProductStore();

const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const product = await productStore.index();
    res.send(product);
  } catch (error) {
    res.send(`Cannot get users due to ${error}.`);
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const productId = Number(req.params.id);
  console.log(productId);

  try {
    const product = await productStore.show(productId);

    res.send(product);
  } catch (error) {
    res.send(`Cannot get user by id ${productId}, ${error}.`);
  }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  const newProduct: Product = {
    name: req.params.name,
    price: Number(req.params.price),
    category: req.params.category
  }

  try {
    const product = await productStore.create(newProduct);

    res.send(product);
  } catch (error) {
    res.send(`Cannot add new product ${error}`);
  }
}

export { index, show, create };
