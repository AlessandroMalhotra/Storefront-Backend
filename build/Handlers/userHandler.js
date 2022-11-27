"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.create = exports.show = exports.index = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userFacingError_1 = require("../ErrorClasses/UserFacingErrors/userFacingError");
const user_1 = require("../Models/user");
const SECRET = process.env.SECRET;
const userAccount = new user_1.UserAccounts();
const index = async (req, res) => {
    try {
        const user = await userAccount.index();
        if (!user.length) {
            throw new userFacingError_1.NotFoundError('No users found.');
        }
        res.send(user);
    }
    catch (error) {
        if (error instanceof userFacingError_1.BadRequestError) {
            res.status(400).send(error);
        }
        else {
            res.status(404).send(error);
        }
    }
};
exports.index = index;
const show = async (req, res) => {
    const userId = Number(req.body.id);
    console.log(userId);
    try {
        const user = await userAccount.show(userId);
        if (user === undefined) {
            throw new userFacingError_1.NotFoundError(`Cannot get user by id ${userId},`);
        }
        res.json(user);
    }
    catch (error) {
        if (error instanceof userFacingError_1.BadRequestError) {
            res.status(400).send(error);
        }
        else {
            res.status(404).send(error);
        }
    }
};
exports.show = show;
const create = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await userAccount.create(user);
        let token;
        if (newUser.username === 'admin') {
            token = jsonwebtoken_1.default.sign({ username: newUser.username, password: newUser.password, admin: true }, SECRET);
        }
        else {
            token = jsonwebtoken_1.default.sign({ username: newUser.username, password: newUser.password, admin: false }, SECRET);
        }
        res.json(token);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.create = create;
const signIn = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    console.log(user);
    try {
        let token;
        const userPassword = await userAccount.authenticate(user);
        if (userPassword) {
            if (user.username === 'admin') {
                token = jsonwebtoken_1.default.sign({ username: user.username, password: userPassword.password, admin: true }, SECRET);
            }
            else {
                token = jsonwebtoken_1.default.sign({ username: user.username, password: userPassword.password, admin: false }, SECRET);
            }
        }
        else {
            throw new userFacingError_1.NotFoundError('User not found with those credentials please try again.');
        }
        res.json(token);
    }
    catch (error) {
        if (error instanceof userFacingError_1.BadRequestError) {
            res.status(400).send(error);
        }
        else {
            res.status(404).send(error);
        }
    }
};
exports.signIn = signIn;
