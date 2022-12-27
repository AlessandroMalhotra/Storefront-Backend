import express from 'express';
import { BadRequestError, NotFoundError } from '../ErrorClasses/UserFacingErrors/userFacingError';
import { Dashboard, orderStatus } from './dashboard';

const dashboard = new Dashboard();

const currentOrder = async (req: express.Request, res: express.Response): Promise<void> => {
  const usersID = Number(req.params.user_id);
  const status = req.params.status;
  try {
    const activeOrders = await dashboard.userOrder(usersID, status);
    if (activeOrders === undefined) {
      throw new NotFoundError(`No active orders for user ${usersID}`);
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
  const usersID = Number(req.params.user_id);
  const status = req.params.status;
  try {
    const activeOrders = await dashboard.userOrder(usersID, status);
    if (activeOrders === undefined) {
      throw new NotFoundError(`No completed orders for user ${usersID}`);
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

const categoryProduct = async (req: express.Request, res: express.Response): Promise<void> => {
  let category = req.params.category;

  try {
    const products = await dashboard.category(category);
    if (products === undefined) {
      throw new NotFoundError(`No products with category name: ${category}`);
    }
    res.send(products);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

export { currentOrder, completedOrder, categoryProduct };
