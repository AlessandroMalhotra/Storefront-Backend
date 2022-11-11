"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccounts = void 0;
const database_1 = __importDefault(require("../Database/database"));
class UserAccounts {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const user = await connection.query(sql);
            //console.log(user);
            connection.release();
            return user.rows;
        }
        catch (error) {
            throw new Error(`Cannot show users ${error}`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const user = await connection.query(sql, [id]);
            //console.log(user);
            connection.release();
            return user.rows;
        }
        catch (error) {
            throw new Error(`Cannot get specifc user ${error}`);
        }
    }
    async create(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO user (firstName, lastName, password) VALUES ($1, $2, $3)';
            const user = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.password,
            ]);
            //console.log(user);
            connection.release();
            return user.rows;
        }
        catch (error) {
            throw new Error(`Cannot insert product into database ${error}`);
        }
    }
}
exports.UserAccounts = UserAccounts;
