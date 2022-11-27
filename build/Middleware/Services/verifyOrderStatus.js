"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../Database/database"));
const userFacingError_1 = require("../../ErrorClasses/UserFacingErrors/userFacingError");
const orderStatus = async (req, res, next) => {
    const order_id = req.params.id;
    let status;
    try {
        const connection = await database_1.default.connect();
        const sql = 'SELECT status FROM orders WHERE id = ($1)';
        const result = await connection.query(sql, [order_id]);
        status = result.rows[0];
        connection.release();
        verifyStatus(status, next);
    }
    catch (error) {
        throw new userFacingError_1.BadRequestError(`Cannot get the status of the order due to the following error: ${error}`);
    }
};
const verifyStatus = (status, next) => {
    switch (status) {
        case 'active':
            next();
            break;
        case 'completed':
            // see if can use a error handler middleware specifically for this route 
            throw new userFacingError_1.BadRequestError(`Unable to add product to order as the status is ${status}.`);
            break;
    }
};
exports.default = orderStatus;
