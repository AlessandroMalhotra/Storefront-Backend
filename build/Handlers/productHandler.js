"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const product_1 = require("../Models/product");
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
const productStore = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const product = await productStore.index();
        if (!product.length) {
            throw new userFacingError_1.NotFoundError('No products found.');
        }
        res.send(product);
    }
    catch (error) {
        if (error instanceof userFacingError_1.BadRequestError) {
            res.status(400).send(error);
        }
        else {
            res.status(404).send(error);
        }
    }
};
exports.index = index;
const show = async (req, res) => {
    const productId = Number(req.params.id);
    let product;
    try {
        product = await productStore.show(productId);
        if (product === undefined) {
            // throw new NotFoundError('Product with given id not found.')
            throw new userFacingError_1.NotFoundError('Product with given id not found.');
        }
        res.send(product);
    }
    catch (error) {
        if (error instanceof userFacingError_1.BadRequestError) {
            res.status(400).send(error);
        }
        else {
            res.status(404).send(error);
        }
    }
};
exports.show = show;
const create = async (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
    };
    try {
        const product = await productStore.create(newProduct);
        res.send(product);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.create = create;
