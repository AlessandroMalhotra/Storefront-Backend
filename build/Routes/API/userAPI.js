"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../Models/user");
const users = express_1.default.Router();
const userAccount = new user_1.UserAccounts();
users.get('/', async (req, res) => {
    try {
        const user = await userAccount.index();
        res.send(user);
    }
    catch (error) {
        res.send(`Cannot get users due to ${error}.`);
    }
});
users.get('/:id', async (req, res) => {
    const userId = Number(req.params.id);
    try {
        const user = await userAccount.show(userId);
        res.send(user);
    }
    catch (error) {
        res.send(`Cannot get user by id ${userId}, ${error}.`);
    }
});
exports.default = users;
