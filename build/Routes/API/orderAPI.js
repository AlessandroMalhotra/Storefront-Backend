"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHandler_1 = require("../../Handlers/orderHandler");
const verifyToken_1 = __importDefault(require("../../Middleware/Authentication/verifyToken"));
const verifyOrderStatus_1 = __importDefault(require("../../Middleware/Services/verifyOrderStatus"));
const orders = express_1.default.Router();
orders.post('/neworder', verifyToken_1.default, orderHandler_1.create);
orders.post('/:id/product', verifyToken_1.default, verifyOrderStatus_1.default, orderHandler_1.addProduct);
// need update order status function
exports.default = orders;
