import express, { NextFunction } from 'express';
import client from '../../Database/database';

const orderStatus = async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
  const order_id = req.params.id;
  let status: string
  try {
    const connection = await client.connect();
    const sql = 'SELECT status FROM orders WHERE id = ($1)';
    const result = await connection.query(sql, [order_id]);

    status = result.rows[0];

    connection.release();
    verifyStatus(status, next);
  } catch (error) {
    res.send(`${error}`);
  }
};

const verifyStatus = (status: string, next: NextFunction): void => {
  switch (status) {
    case 'active':
      next();
      break;
    case 'completed':
      next(`Unable to add product to order as order status is ${status}`);
      break;
  }
}

export default orderStatus;
