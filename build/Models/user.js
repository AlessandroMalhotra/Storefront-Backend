"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccounts = void 0;
const database_1 = __importDefault(require("../Database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
class UserAccounts {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const user = await connection.query(sql);
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
            const result = await connection.query(sql, [id]);
            const user = result.rows[0];
            connection.release();
            return user;
        }
        catch (error) {
            throw new Error(`Cannot get specifc user ${error}`);
        }
    }
    async create(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO users ("firstName", "lastName", password, username) VALUES ($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, Number(SALT_ROUNDS));
            const result = await connection.query(sql, [u.firstName, u.lastName, hash, u.username]);
            const user = result.rows[0];
            connection.release();
            return user;
        }
        catch (error) {
            throw new Error(`Cannot insert user into database ${error}`);
        }
    }
}
exports.UserAccounts = UserAccounts;
