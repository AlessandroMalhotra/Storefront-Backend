"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../Models/user");
const user = new user_1.UserAccounts();
describe('Test user model functions', () => {
    const newUser = {
        id: 2,
        firstName: 'sandro',
        lastName: 'malhotra',
        password: 'password',
        username: 'sandro25',
        admin: false
    };
    fit('Checks user index function correctly been defined', () => {
        expect(user.index).toBeDefined();
    });
    fit('Checks user create function correctly been defined', () => {
        expect(user.create).toBeDefined();
    });
    fit('Checks user show function correctly been defined', () => {
        expect(user.show).toBeDefined();
    });
    fit('Create a user successfully ', async () => {
        const users = await user.create(newUser);
        expect(users).toEqual({
            id: 3,
            firstName: 'sandro',
            lastName: 'malhotra',
            password: users.password,
            username: 'sandro25',
            admin: false
        });
    });
    // it('Should return a list of users', async () => {
    //   const users = await user.index();
    //   expect(users).toEqual([users]);
    // });
    fit('Should return user by id', async () => {
        const users = await user.show(2);
        expect(users).toEqual({
            id: 2,
            firstName: 'Alessandro',
            lastName: 'Malhotra',
            password: users.password,
            username: 'sandro25',
            admin: false
        });
    });
});
