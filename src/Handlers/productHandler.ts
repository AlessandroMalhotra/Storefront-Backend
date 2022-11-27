import express, { NextFunction } from 'express';
import { ProductStore, Product } from '../Models/product';
import { ApplicationError } from '../ErrorClasses/baseErrorClass';
import { NotFoundError, BadRequestError } from '../ErrorClasses/UserFacingErrors.ts/userFacingError';

const productStore = new ProductStore();

const index = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const product = await productStore.index();
    if (!product.length) {
      throw new NotFoundError('No products found.')
    }
    res.send(product).status(200);
  } catch (error) {
    res.status(404).send(error);
  }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
  const productId = Number(req.params.id);
  let product: Product;

  try {
    product = await productStore.show(productId);
    console.log(product);
    if (product === undefined) {
      // throw new NotFoundError('Product with given id not found.')
      throw new NotFoundError('Product with given id not found.');
    }
    res.send(product).status(200);
  } catch (error) {
    res.status(404).send(error);
  }


};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  const newProduct: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
  };

  try {
    const product = await productStore.create(newProduct);
    res.send(product).status(200);
  } catch (error) {
    res.send(error);
  }
};

export { index, show, create };
