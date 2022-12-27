import { app } from '../../server';
import { Product } from '../../Models/product';
import { User } from '../../Models/user';
import supertest from 'supertest';

const server = supertest(app);

describe('Test Dashboard Endpoint Responses', () => {
  const admin: User = {
    username: 'admin',
    password: 'admin',
  };

  let token: string;

  beforeAll(async () => {
    // sign in a admin user so that can use the token for the tests
    const response = await server.post('/users/signin').send(admin);
    expect(response.status).toBe(200);
    expect(response.body.token);
    token = response.body;
  });

  it('Get products by category', async () => {
    const response = await server.get('/products/productcategory/sweatshirt').set('Authorization', `Bearer ${token}`).send('sweatshirt');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      {
        id: 1,
        name: 'FOG Essentials Jumper',
        price: 85,
        category: 'sweatshirt',
        quantity: 2,
      },
    );
  });
});
