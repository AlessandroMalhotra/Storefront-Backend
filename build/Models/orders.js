"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const database_1 = __importDefault(require("../Database/database"));
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
class Orders {
    async create(order) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO orders(status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await connection.query(sql, [order.status, order.user_id]);
            const newOrder = result.rows[0];
            connection.release();
            return newOrder;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Can't create new order due to: ${error}`);
        }
    }
    async update(order_id) {
        try {
            const connection = await database_1.default.connect();
            // update an order
        }
        catch (error) {
            // throw error here
        }
    }
    async addProduct(order_product) {
        // add product to order
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO order_product(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [order_product.quantity, order_product.orderId, order_product.productId]);
            const orderProduct = result.rows[0];
            connection.release();
            return orderProduct;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Can't add ${order_product.productId} to order ${order_product.orderId} due to: ${error}`);
        }
    }
}
exports.Orders = Orders;
