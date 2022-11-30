"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const server = (0, supertest_1.default)(server_1.app);
describe('Test User Endpoint Responses', () => {
    const admin = {
        username: "admin",
        password: "admin"
    };
    const product = {
        id: 1,
        name: 'Nike Air Force 1',
        price: 135,
        category: 'Trainers',
        quantity: 1
    };
    let token;
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
            quantity: 1
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
            quantity: 1
        });
    });
    fit('GET all products ', async () => {
        const response = await server.get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
                id: 1,
                name: 'Nike Air Force 1',
                price: 135,
                category: 'Trainers',
                quantity: 1
            }]);
    });
});
