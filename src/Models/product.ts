import client from '../Database/database';

type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
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
      throw new Error(`Cannot get products ${error}`);
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
      throw new Error(`Cannot get specific product ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *';

      const result = await connection.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];

      connection.release();
      return product;
    } catch (error) {
      throw new Error(`Cannot insert product into database ${error}`);
    }
  }
}

export { Product, ProductStore };
