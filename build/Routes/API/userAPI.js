"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userHandler_1 = require("../../Handlers/userHandler");
const users = express_1.default.Router();
users.get('/', userHandler_1.index);
users.get('/:id', userHandler_1.show);
exports.default = users;
