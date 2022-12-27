import { lowerCase } from 'lodash';
import client from '../Database/database';
import { BadRequestError } from '../ErrorClasses/UserFacingErrors/userFacingError';
import { Product } from '../Models/product';

type orderStatus = {
  id?: number;
  status: string;
  user_id: number;
  order_id?: number;
  product_id?: number;
};

class Dashboard {
  async userOrder(user_id: Number, status: string): Promise<orderStatus> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT user_id, status, order_id, product_id FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE status = ($1) AND user_id = ($2)';
      const result = await connection.query(sql, [status, user_id]);
      const activeOrder = result.rows[0];

      connection.release();
      return activeOrder;
    } catch (error) {
      throw new BadRequestError(`Can't find any active orders for user due to: ${error}`);
    }
  }

  async category(category: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM product WHERE category = ($1)';
      const result = await connection.query(sql, [category.toLowerCase()]);

      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new BadRequestError(`Cannot get the product due to the following error: ${error}`);
    }
  }
}

export { Dashboard, orderStatus };
