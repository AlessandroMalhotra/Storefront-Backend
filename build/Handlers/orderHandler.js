"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.create = void 0;
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
const orders_1 = require("../Models/orders");
const orders = new orders_1.Orders();
const create = async (req, res) => {
    const order = {
        status: req.body.status,
        user_id: Number(req.body.user_id),
    };
    try {
        const newOrder = await orders.create(order);
        res.send(newOrder);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.create = create;
const addProduct = async (req, res) => {
    const order_product = {
        quantity: Number(req.body.quantity),
        orderId: Number(req.params.order_id),
        productId: Number(req.body.product_id),
    };
    try {
        const addedProduct = await orders.addProduct(order_product);
        if (addedProduct === undefined) {
            throw new userFacingError_1.NotFoundError(`Unable to add ${order_product.productId} to order ${order_product.orderId} as orderId or productId doesn't exist`);
        }
        res.send(addedProduct);
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
exports.addProduct = addProduct;
