import client from '../Database/database';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

class UserAccounts {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users';
      const user = await connection.query(sql);
      //console.log(user);
      connection.release();
      return user.rows;
    } catch (error) {
      throw new Error(`Cannot show users ${error}`);
    }
  }

  async show(id: number): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const user = await connection.query(sql, [id]);
      //console.log(user);
      connection.release();
      return user.rows;
    } catch (error) {
      throw new Error(`Cannot get specifc user ${error}`);
    }
  }

  async create(u: User): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO user (firstName, lastName, password) VALUES ($1, $2, $3)';
      const user = await connection.query(sql, [
        u.firstName,
        u.lastName,
        u.password,
      ]);
      //console.log(user);
      connection.release();
      return user.rows;
    } catch (error) {
      throw new Error(`Cannot insert product into database ${error}`);
    }
  }
}

export { User, UserAccounts };
