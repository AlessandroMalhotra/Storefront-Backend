import express from 'express';
import { BadRequestError, NotFoundError } from '../ErrorClasses/UserFacingErrors/userFacingError';
import { Orders, Order } from '../Models/orders';

const orders = new Orders();

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  const order: Order = {
    status: req.body.status,
    user_id: Number(req.body.user_id),
  };
  try {
    const newOrder = await orders.create(order);
    
    res.send(newOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

const addProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  const orderProduct = {
    quantity: Number(req.body.quantity),
    orderId: Number(req.params.order_id),
    productId: Number(req.body.product_id),
  };
  try {
    const addedProduct = await orders.addProduct(orderProduct);
    if (addedProduct === undefined) {
      throw new NotFoundError(`Unable to add ${orderProduct.productId} to order ${orderProduct.orderId} as orderId or productId doesn't exist`)
    }

    res.send(addedProduct);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

const currentOrder = async (req: express.Request, res: express.Response): Promise<void> => {
  const usersID =  Number(req.params.user_id);
  try {
    const activeOrders = await orders.userOrder(usersID);
    if (activeOrders === undefined) {
      throw new NotFoundError(`No active orders for user ${usersID}`)
    }
    res.send(activeOrders);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

const completedOrder = async (req: express.Request, res: express.Response): Promise<void> => {
  const usersID =  Number(req.params.user_id);
  try {
    const activeOrders = await orders.userOrder(usersID);
    if (activeOrders === undefined) {
      throw new NotFoundError(`No active orders for user ${usersID}`)
    }
    res.send(activeOrders);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

export { create, addProduct, currentOrder, completedOrder };
