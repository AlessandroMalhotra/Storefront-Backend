"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const server = (0, supertest_1.default)(server_1.app);
describe('Test Dashboard Endpoint Responses', () => {
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
    it('Get products by category', async () => {
        const response = await server.get('/products/productcategory/sweatshirt').set('Authorization', `Bearer ${token}`).send('sweatshirt');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: 'FOG Essentials Jumper',
            price: 85,
            category: 'sweatshirt',
            quantity: 2,
        });
    });
});
