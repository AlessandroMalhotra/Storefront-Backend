import express, { NextFunction } from 'express';
import client from '../../Database/database';
import { BadRequestError } from '../../ErrorClasses/UserFacingErrors/userFacingError';

const orderStatus = async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
  const order_id = req.params.id;
  let status: string;
  try {
    const connection = await client.connect();
    const sql = 'SELECT status FROM orders WHERE id = ($1)';
    const result = await connection.query(sql, [order_id]);

    status = result.rows[0];

    connection.release();
    verifyStatus(status, next);
  } catch (error) {
    throw new BadRequestError(`Cannot get the status of the order due to the following error: ${error}`);
  }
};

const verifyStatus = (status: string, next: NextFunction): void => {
  switch (status) {
    case 'active':
      next();
      break;
    case 'completed':
      // see if can use a error handler middleware specifically for this route 
      next(`Unable to add product to order as order status is ${status}`);
      break;
  }
};

export default orderStatus;
