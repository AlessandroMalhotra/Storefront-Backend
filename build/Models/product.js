"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../Database/database"));
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
class ProductStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const product = await connection.query(sql);
            //console.log(product);
            connection.release();
            return product.rows;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Cannot get the product due to the following error: ${error}`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM product WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            const product = result.rows[0];
            connection.release();
            return product;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Cannot get the product due to the following error: ${error}`);
        }
    }
    async create(p) {
        /**  Need to change product database so it only allows same product name once and quantity column
             then here check if product name exists if so just increase quantity
         */
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO product (name, price, category, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await connection.query(sql, [p.name, p.price, p.category, p.quantity]);
            const product = result.rows[0];
            connection.release();
            return product;
        }
        catch (error) {
            console.log(`${error}`);
            throw new userFacingError_1.BadRequestError(`Cannot insert product to the database due to the following ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
