"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../Models/product");
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
        const products = await product.index();
        expect(products).toEqual([]);
    });
    // it('Should return product by id', async () => {
    //   const users = await product.show(1);
    //   expect(users).toEqual([{
    //     id: 1,
    //     firstName: 'sandro',
    //     lastName: 'malhotra',
    //     password: 'password',
    //   }])
    // });
});
