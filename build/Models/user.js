"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccounts = void 0;
const database_1 = __importDefault(require("../Database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
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
            throw new userFacingError_1.BadRequestError(`Cannot get users credentials due to the following error: ${error}`);
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
            throw new userFacingError_1.BadRequestError(`Cannot get the user due to the following error: ${error}`);
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
            throw new userFacingError_1.BadRequestError(`Cannot create user due to the following error: ${error}`);
        }
    }
    async authenticate(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE username = ($1)';
            const result = await connection.query(sql, [u.username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(u.password + BCRYPT_PASSWORD, user.password)) {
                    connection.release();
                    return user;
                }
            }
            return null;
        }
        catch (error) {
            throw new userFacingError_1.BadRequestError(`Cannot sign in with username or password due to following error: ${error}`);
        }
    }
}
exports.UserAccounts = UserAccounts;
