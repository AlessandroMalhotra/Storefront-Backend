"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.index = void 0;
const user_1 = require("../Models/user");
const userAccount = new user_1.UserAccounts();
const index = async (req, res) => {
    try {
        const user = await userAccount.index();
        res.send(user);
    }
    catch (error) {
        res.send(`Cannot get users due to ${error}.`);
    }
};
exports.index = index;
const show = async (req, res) => {
    const userId = Number(req.params.id);
    console.log(userId);
    try {
        const user = await userAccount.show(userId);
        res.send(user);
    }
    catch (error) {
        res.send(`Cannot get user by id ${userId}, ${error}.`);
    }
};
exports.show = show;
