"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../Database/database"));
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
            throw new Error(`Cannot get products ${error}`);
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
            throw new Error(`Cannot get specific product ${error}`);
        }
    }
    async create(p) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);
            const product = result.rows[0];
            connection.release();
            return product;
        }
        catch (error) {
            throw new Error(`Cannot insert product into database ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
