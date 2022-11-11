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
      const sql =
        'INSERT INTO users ("firstName", "lastName", password) VALUES ($1, $2, $3) RETURNING *';

      const result = await connection.query(sql, [
        u.firstName,
        u.lastName,
        u.password,
      ]);
      const user = result.rows[0];

      connection.release();
      return user;
    } catch (error) {
      throw new Error(`Cannot insert user into database ${error}`);
    }
  }
}

export { User, UserAccounts };
