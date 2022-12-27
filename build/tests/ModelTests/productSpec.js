"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../Models/product");
const product = new product_1.ProductStore();
describe('Test product model functions', () => {
    it('Checks product index method correctly defined', async () => {
        expect(product.index).toBeDefined();
    });
    it('Checks product create function correctly been defined', () => {
        expect(product.create).toBeDefined();
    });
    it('Checks product show function correctly been defined', () => {
        expect(product.show).toBeDefined();
    });
    it('Should return a list of products', async () => {
        const newP = await product.index();
        expect(newP).toEqual([
            {
                id: 1,
                name: 'FOG Essentials Jumper',
                price: 85,
                category: 'sweatshirt',
                quantity: 2,
            },
            {
                id: 2,
                name: 'Nike Air Force 1',
                price: 135,
                category: 'trainers',
                quantity: 1,
            },
        ]);
    });
    it('Should return product by id', async () => {
        const newP = await product.show(2);
        expect(newP).toEqual({
            id: 2,
            name: 'Nike Air Force 1',
            price: 135,
            category: 'trainers',
            quantity: 1,
        });
    });
    it('Insert a product entry successfully ', async () => {
        const newP = await product.create({
            name: 'Nike Dunk Low Disrupt',
            price: 115,
            category: 'trainers',
            quantity: 2,
        });
        expect(newP).toEqual({
            id: 3,
            name: 'Nike Dunk Low Disrupt',
            price: 115,
            category: 'trainers',
            quantity: 2,
        });
    });
});
