"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userFacingError_1 = require("../../ErrorClasses/UserFacingErrors/userFacingError");
const SECRET = process.env.SECRET;
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new userFacingError_1.UnauthorizedError('Unauthrosied request to resource, no authorisation header provided.');
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new userFacingError_1.UnauthorizedError('Unauthrosied request to resource, no token provided.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        // check what verify returns so we can throw the below error.
        if (decoded === String) {
            throw new userFacingError_1.AccessDeniedError('User does not have the permissions to access this resource.');
        }
        // check here the admin boolean in payload and decide whether if user can do the request
        next();
    }
    catch (error) {
        if (error instanceof userFacingError_1.UnauthorizedError) {
            res.status(401).send(error);
        }
        else {
            res.status(403).send(error);
        }
    }
};
exports.default = verifyAuthToken;
