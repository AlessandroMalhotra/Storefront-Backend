"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryProduct = exports.completedOrder = exports.currentOrder = void 0;
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
const dashboard_1 = require("./dashboard");
const dashboard = new dashboard_1.Dashboard();
const currentOrder = async (req, res) => {
    const usersID = Number(req.params.user_id);
    const status = req.params.status;
    try {
        const activeOrders = await dashboard.userOrder(usersID, status);
        if (activeOrders === undefined) {
            throw new userFacingError_1.NotFoundError(`No active orders for user ${usersID}`);
        }
        res.send(activeOrders);
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
exports.currentOrder = currentOrder;
const completedOrder = async (req, res) => {
    const usersID = Number(req.params.user_id);
    const status = req.params.status;
    try {
        const activeOrders = await dashboard.userOrder(usersID, status);
        if (activeOrders === undefined) {
            throw new userFacingError_1.NotFoundError(`No completed orders for user ${usersID}`);
        }
        res.send(activeOrders);
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
exports.completedOrder = completedOrder;
const categoryProduct = async (req, res) => {
    const category = req.params.category;
    try {
        const products = await dashboard.category(category);
        if (products === undefined) {
            throw new userFacingError_1.NotFoundError(`No active orders for user ${category}`);
        }
        res.send(products);
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
exports.categoryProduct = categoryProduct;
