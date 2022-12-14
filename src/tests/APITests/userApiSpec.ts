import { app } from '../../server';
import { User } from '../../Models/user';
import supertest from 'supertest';

const server = supertest(app);

describe('Test User Endpoint Responses', () => {
  const user: User = {
    firstName: 'Alessandro',
    lastName: 'Malhotra',
    username: 'sandro25',
    password: 'password',
  };

  const admin: User = {
    username: 'admin',
    password: 'admin',
  };

  let token: string;

  beforeAll(async () => {
    // sign in a admin user so that can use the token for the tests
    const response = await server.post('/users/signin').send(admin);
    token = response.body;
  });

  it('Sign a user in with the given credentials', async () => {
    const response = await server.post('/users/signin').send(admin);
    expect(response.status).toBe(200);
    expect(response.body.token);
  });

  it('Show all users and correct token passed', async () => {
    const response = await server.get('/users').set('Authorization', `Bearer ${token}`).send('1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstName: 'Sandro',
        lastName: 'Malhotra',
        username: 'admin',
        password: '$2a$09$WUfrYhjvK0jmYFGuKB.uK.6zvYkDuLZNzCe6FvZsnJt2IMyb70u.S',
        admin: true,
      },
    ]);
  });

  it('Create a user with the given credentials and admin token passed', async () => {
    const response = await server.post('/users/createuser').set('Authorization', `Bearer ${token}`).send(user);

    expect(response.status).toBe(200);
    expect(response.body.token);
  });

  it('Show a user by id and correct token passed', async () => {
    const response = await server.get('/users/2').set('Authorization', `Bearer ${token}`).send('2');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 2,
      firstName: 'Alessandro',
      lastName: 'Malhotra',
      username: 'sandro25',
      password: response.body.password,
      admin: false,
    });
  });

  // just need to do the error verisons of these test for each individul route
});
