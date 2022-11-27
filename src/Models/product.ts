import { Connection } from 'pg';
import client from '../Database/database';
import { BadRequestError } from '../ErrorClasses/UserFacingErrors.ts/userFacingError'
import products from '../Routes/API/productAPI';

type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
};

class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM product';

      const product = await connection.query(sql);
      //console.log(product);

      connection.release();
      return product.rows;
    } catch (error) {
      throw new BadRequestError(`Cannot get the product due to the following error: ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM product WHERE id = ($1)';

      const result = await connection.query(sql, [id]);
      const product = result.rows[0];

      connection.release();
      return product;
    } catch (error) {
      throw new BadRequestError(`Cannot get the product ${id} due to the following error: ${error}`);
    }
  }

  async create(p: Product): Promise<Product | null> {
    /**  Need to change product database so it only allows same product name once and quantity column 
         then here check if product name exists if so just increase quantity 
     */
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO product (name, price, category, quantity) VALUES ($1, $2, $3, $4) RETURNING *';

      const result = await connection.query(sql, [p.name, p.price, p.category, p.quantity]);
      const product = result.rows[0];

      connection.release();
      return product;
    } catch (error) {
      console.log(`${error}`);
      throw new BadRequestError(`Cannot insert product to the database due to the following ${error}`);
    }
  }
}

export { Product, ProductStore };
