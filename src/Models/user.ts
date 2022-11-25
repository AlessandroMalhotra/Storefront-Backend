import client from '../Database/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { userInfo } from 'os';
dotenv.config();

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
};

class UserAccounts {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';

      const user = await connection.query(sql);

      connection.release();
      return user.rows;
    } catch (error) {
      throw new Error(`Cannot show users ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';

      const result = await connection.query(sql, [id]);
      const user = result.rows[0];

      connection.release();
      return user;
    } catch (error) {
      throw new Error(`Cannot get specifc user ${error}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO users ("firstName", "lastName", password, username) VALUES ($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(u.password + BCRYPT_PASSWORD, Number(SALT_ROUNDS));

      const result = await connection.query(sql, [u.firstName, u.lastName, hash, u.username]);
      const user = result.rows[0];

      connection.release();
      return user;
    } catch (error) {
      throw new Error(`Cannot insert user into database ${error}`);
    }
  }

  async addProduct(quantity: Number, orderId: Number, productId: Number): Promise<void> {
    // add product to order
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO order_product(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [quantity, orderId, productId]);
      const orderProduct = result.rows[0];

      connection.release();
      return orderProduct;
    } catch (error) {
      throw new Error(`Can't add ${productId} to order ${orderId} due to: ${error}`);
    }
  }
  
  async authenticate(u: User): Promise<User | null> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT password FROM users WHERE username = ($1)';
      
      const result = await connection.query(sql, [u.username]);

      if(result.rows.length) {
        const user = result.rows[0]

        if(bcrypt.compareSync(u.password + BCRYPT_PASSWORD, user.password)) {
          connection.release();
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error('Cannot sign in with username and password.');
    }
  }
}

export { User, UserAccounts };
