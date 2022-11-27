"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userHandler_1 = require("../../Handlers/userHandler");
const verifyToken_1 = __importDefault(require("../../Middleware/Authentication/verifyToken"));
const users = express_1.default.Router();
users.get('/', verifyToken_1.default, userHandler_1.index);
users.get('/id', verifyToken_1.default, userHandler_1.show);
users.post('/createuser', verifyToken_1.default, userHandler_1.create);
users.post('/signin', userHandler_1.signIn);
exports.default = users;
