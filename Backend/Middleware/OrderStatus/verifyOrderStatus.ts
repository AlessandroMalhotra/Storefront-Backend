import express, { NextFunction } from 'express';
import client from '../../../Database/database';
import { BadRequestError } from '../../ErrorClasses/UserFacingErrors/userFacingError';

const orderStatus = async (order_id: number): Promise<string> => {
  try {
    const connection = await client.connect();
    const sql = 'SELECT status FROM orders WHERE id = ($1)';
    const result = await connection.query(sql, [order_id]);

    let status = result.rows[0];
    console.log(status);
    status = String(Object.values(status));

    connection.release();
    return status;
  } catch (error) {
    throw new BadRequestError(`Cannot get the status of the order due to the following error: ${error}`);
  }
};

const verifyStatus = async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
  const orderId = Number(req.body.order_id);
  console.log(orderId);

  try {
    const status = await orderStatus(orderId);

    if (status === 'completed') {
      throw new BadRequestError(`Unable to add product to order as the status is ${status}.`);
    }
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export default verifyStatus;
