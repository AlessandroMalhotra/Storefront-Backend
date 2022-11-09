import Client from '../Database/database';

type Product = {
  id: Number;
  name: string;
  price: Number;
  category: string;
};

class ProductStore {
   
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM product';
      const product = await connection.query(sql);
      console.log(product);
      connection.release();
      return product.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  }

  async show(id: string): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM product WHERE id = ($1)';
      const product = await connection.query(sql, [id]);
      console.log(product);
      connection.release();
      return product.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  }

  async create(p: Product): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3)';
      const product = await connection.query(sql,[p.name, p.price, p.category]);
      console.log(product);
      connection.release();
      return product.rows;
    } catch (error) {
      throw new Error(`Cannot insert product into database ${error}`);
    }
  }
}

export { Product, ProductStore };
