"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../Models/orders");
const order = new orders_1.Orders();
describe('Test order model functions', () => {
    const newOrder = {
        status: 'active',
        user_id: 2
    };
    fit('Checks order create function correctly been defined', () => {
        expect(order.create).toBeDefined();
    });
    fit('Checks if addProduct function correctly defined.', () => {
        expect(order.addProduct).toBeDefined();
    });
    fit('Create a new order for a given user.', async () => {
        const response = await order.create(newOrder);
        expect(response).toEqual({
            id: 1,
            status: 'active',
            user_id: 2
        });
    });
});
