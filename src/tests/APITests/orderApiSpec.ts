import express from 'express';
import { app } from "../../server";
import supertest from 'supertest';
import { Order } from '../../Models/orders';
import { User } from '../../Models/user';

const server = supertest(app);

describe('Test Order endpoint methods', () => {
    const newOrder: Order = {
        status: "active",
        user_id: 1
    }

    const admin: User = {
        username: "admin",
        password: "admin"
    }

    let token: string;

    beforeAll(async () => {
        // sign in a admin user so that can use the token for the tests
        const response = await server.post('/users/signin').send(admin)
        expect(response.status).toBe(200);
        expect(response.body.token);
        token = response.body;
    });

    fit('Create an order for a given user_id', async () => {
        const response = await server.post('/orders/neworder').set('Authorization', `Bearer ${token}`).send(newOrder)
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            status: 'active',
            user_id: 1
        });
    });

    it('Add a product to an order', async () => {
        const response = await server.post('/orders/1/product').set('Authorization', `Bearer ${token}`).send({
            quantity: 1,
            product_id: 1
        })
        expect(response.status).toBe(200);
    });

});