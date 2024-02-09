import client from '../Database/database';
import { BadRequestError } from '../ErrorClasses/UserFacingErrors/userFacingError';

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
      throw new BadRequestError(`Cannot get the product due to the following error: ${error}`);
    }
  }

  async productExists(name: string): Promise<boolean> {
    try {
      const productName = name.replace(/\s/g, '').toLowerCase();
      const connection = await client.connect();
      const sql = 'SELECT name FROM product';
      const result = await connection.query(sql);

      let names = result.rows[0];
      names = Object.values(names);

      for (let product of names) {
        product = product.replace(/\s/g, '').toLowerCase();
        console.log(product);

        if (product == productName) {
          throw new BadRequestError(`Product with name ${name} already exists.`);
        }
      }
      connection.release();
      return true;
    } catch (error) {
      throw new BadRequestError(`Product with name ${name} already exists.`);
    }
  }

  async create(p: Product): Promise<Product | unknown> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO product (name, price, category, quantity) VALUES ($1, $2, $3, $4) RETURNING *';

      const result = await connection.query(sql, [p.name, p.price, p.category, p.quantity]);
      const product = result.rows[0];

      connection.release();
      return product;
    } catch (error) {
      throw new BadRequestError(`Cannot insert product to the database due to the following ${error}`);
    }
  }
}

export { Product, ProductStore };
