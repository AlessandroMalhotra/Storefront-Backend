"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../Database/database"));
const userFacingError_1 = require("../../ErrorClasses/UserFacingErrors/userFacingError");
const orderStatus = async (order_id) => {
    try {
        const connection = await database_1.default.connect();
        const sql = 'SELECT status FROM orders WHERE id = ($1)';
        const result = await connection.query(sql, [order_id]);
        //console.log(result);
        let status = result.rows[0];
        status = String(Object.values(status));
        connection.release();
        return status;
    }
    catch (error) {
        throw new userFacingError_1.BadRequestError(`Cannot get the status of the order due to the following error: ${error}`);
    }
};
const verifyStatus = async (req, res, next) => {
    const orderId = Number(req.body.order_id);
    console.log(orderId);
    try {
        const status = await orderStatus(orderId);
        if (status === 'completed') {
            throw new userFacingError_1.BadRequestError(`Unable to add product to order as the status is ${status}.`);
        }
        next();
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.default = verifyStatus;
