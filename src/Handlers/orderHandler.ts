import express from 'express';
import { Orders, Order } from '../Models/orders';

const orders = new Orders();

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  const order: Order = {
    status: req.body.satus,
    user_id: Number(req.body.user_id),
  };
  try {
    const newOrder = await orders.create(order);

    res.send(newOrder);
  } catch (error) {
    throw new Error(`Unable to create order due to ${error}`);
  }
};

const addProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  const order_product = {
    quantity: req.body.quantity,
    orderId: Number(req.params.order_id),
    productId: req.body.product_id
  };
  try {
    const addedProduct = await orders.addProduct(order_product);

    res.send(addedProduct);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export { create, addProduct};