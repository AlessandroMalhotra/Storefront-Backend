import express from 'express';
import { app } from '../../server';
import { Product } from '../../Models/product';
import { User } from '../../Models/user';
import supertest from 'supertest';

const server = supertest(app);

describe('Test User Endpoint Responses', () => {
  const admin: User = {
    username: 'admin',
    password: 'admin',
  };

  const product: Product = {
    id: 1,
    name: 'Nike Air Force 1',
    price: 135,
    category: 'Trainers',
    quantity: 1,
  };

  let token: string;

  beforeAll(async () => {
    // sign in a admin user so that can use the token for the tests
    const response = await server.post('/users/signin').send(admin);
    expect(response.status).toBe(200);
    expect(response.body.token);
    token = response.body;
  });

  fit('POST Create a new product to be added to the database', async () => {
    const response = await server.post('/products/newproduct').set('Authorization', `Bearer ${token}`).send(product);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Nike Air Force 1',
      price: 135,
      category: 'Trainers',
      quantity: 1,
    });
  });

  fit('GET product by id', async () => {
    const response = await server.get('/products/1').send('1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Nike Air Force 1',
      price: 135,
      category: 'Trainers',
      quantity: 1,
    });
  });

  fit('GET all products ', async () => {
    const response = await server.get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: 'Nike Air Force 1',
        price: 135,
        category: 'Trainers',
        quantity: 1,
      },
    ]);
  });
});
