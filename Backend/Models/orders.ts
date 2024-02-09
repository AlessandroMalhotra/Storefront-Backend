import client from '../Database/database';
import { BadRequestError } from '../ErrorClasses/UserFacingErrors/userFacingError';

type Order = {
  id?: number;
  status: string;
  user_id: number;
};

class Orders {
  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [order.status, order.user_id]);
      const newOrder = result.rows[0];

      newOrder.user_id = Number(newOrder.user_id);

      connection.release();
      return newOrder;
    } catch (error) {
      throw new BadRequestError(`Can't create new order due to: ${error}`);
    }
  }

  // async update(order_id: number): Promise<void> {
  //   try {
  //     const connection = await client.connect();
  //     // update an order
  //   } catch (error) {
  //     // throw error here
  //   }
  // }

  async addProduct(order_product: { quantity: number; orderId: number; productId: number }): Promise<Order> {
    // add product to order
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [order_product.quantity, order_product.orderId, order_product.productId]);
      const orderProduct = result.rows[0];
      console.log(orderProduct);

      connection.release();
      return orderProduct;
    } catch (error) {
      throw new BadRequestError(`Can't add ${order_product.productId} to order ${order_product.orderId} due to: ${error}`);
    }
  }
}

export { Orders, Order };
