"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.index = void 0;
const product_1 = require("../Models/product");
const productStore = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const product = await productStore.index();
        res.send(product);
    }
    catch (error) {
        res.send(`Cannot get users due to ${error}.`);
    }
};
exports.index = index;
const show = async (req, res) => {
    const productId = Number(req.params.id);
    console.log(productId);
    try {
        const product = await productStore.show(productId);
        res.send(product);
    }
    catch (error) {
        res.send(`Cannot get user by id ${productId}, ${error}.`);
    }
};
exports.show = show;
