"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const server = (0, supertest_1.default)(server_1.app);
describe('Test User Endpoint Responses', () => {
    const user = {
        firstName: "Alessandro",
        lastName: "Malhotra",
        username: "sandro25",
        password: "password"
    };
    const admin = {
        username: "admin",
        password: "admin"
    };
    let token;
    beforeAll(async () => {
        // sign in a admin user so that can use the token for the tests
        const response = await server.post('/users/signin').send(admin);
        token = response.body;
    });
    fit('Sign a user in with the given credentials', async () => {
        const response = await server.post('/users/signin').send(admin);
        expect(response.status).toBe(200);
        expect(response.body.token);
    });
    fit('Show all users and correct token passed', async () => {
        const response = await server.get('/users').set('Authorization', `Bearer ${token}`).send('1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
                id: 1,
                firstName: "Sandro",
                lastName: "Malhotra",
                username: "admin",
                password: '$2a$09$WUfrYhjvK0jmYFGuKB.uK.6zvYkDuLZNzCe6FvZsnJt2IMyb70u.S',
                admin: true
            }]);
    });
    fit('Create a user with the given credentials and admin token passed', async () => {
        const response = await server.post('/users/createuser').set('Authorization', `Bearer ${token}`).send(user);
        expect(response.status).toBe(200);
        expect(response.body.token);
    });
    fit('Show a user by id and correct token passed', async () => {
        const response = await server.get('/users/2').set('Authorization', `Bearer ${token}`).send('1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 2,
            firstName: "Alessandro",
            lastName: "Malhotra",
            username: "sandro25",
            password: response.body.password,
            admin: false
        });
    });
    // just need to do the error verisons of these test for each individul route
});
