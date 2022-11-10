"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccounts = void 0;
const database_1 = __importDefault(require("../Database/database"));
class UserAccounts {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const user = yield connection.query(sql);
                //console.log(user);
                connection.release();
                return user.rows;
            }
            catch (error) {
                throw new Error(`Cannot get weapons ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id = ($1)';
                const user = yield connection.query(sql, [id]);
                //console.log(user);
                connection.release();
                return user.rows;
            }
            catch (error) {
                throw new Error(`Cannot get weapons ${error}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO user (firstName, lastName, password) VALUES ($1, $2, $3)';
                const user = yield connection.query(sql, [u.firstName, u.lastName, u.password]);
                //console.log(user);
                connection.release();
                return user.rows;
            }
            catch (error) {
                throw new Error(`Cannot insert product into database ${error}`);
            }
        });
    }
}
exports.UserAccounts = UserAccounts;