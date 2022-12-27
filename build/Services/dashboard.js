"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const database_1 = __importDefault(require("../Database/database"));
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
class Dashboard {
    async userOrder(user_id, status) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT user_id, status, order_id, product_id FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE status = ($1) AND user_id = ($2)';
            const result = await connection.query(sql, [status, user_id]);
            const activeOrder = result.rows[0];
            connection.release();
            return activeOrder;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Can't find any active orders for user due to: ${error}`);
        }
    }
    async category(category) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM product WHERE category = ($1)';
            const result = await connection.query(sql, [category]);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Cannot get the product due to the following error: ${error}`);
        }
    }
}
exports.Dashboard = Dashboard;
