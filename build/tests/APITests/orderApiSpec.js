"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const server = (0, supertest_1.default)(server_1.app);
describe('Test Order endpoint methods', () => {
    const newOrder = {
        status: 'active',
        user_id: 1,
    };
    const admin = {
        username: 'admin',
        password: 'admin',
    };
    let token;
    beforeAll(async () => {
        // sign in a admin user so that can use the token for the tests
        const response = await server.post('/users/signin').send(admin);
        expect(response.status).toBe(200);
        expect(response.body.token);
        token = response.body;
    });
    xit('Create an order for a given user_id', async () => {
        const response = await server.post('/orders/neworder').set('Authorization', `Bearer ${token}`).send(newOrder);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });
    xit('Add a product to an order', async () => {
        const response = await server.post('/orders/1/product').set('Authorization', `Bearer ${token}`).send({
            quantity: 1,
            product_id: 1,
        });
        expect(response.status).toBe(200);
    });
});
