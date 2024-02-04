"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = void 0;
const httpStatusCodes_1 = require("../../HttpStatusCodes/httpStatusCodes");
const baseErrorClass_1 = __importDefault(require("../baseErrorClass"));
class BadRequestError extends baseErrorClass_1.default {
    constructor(description, httpCode = httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST, isOperational = false, name = 'Bad Request') {
        super(description, httpCode, isOperational, name);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends baseErrorClass_1.default {
    constructor(description, httpCode = httpStatusCodes_1.HttpStatusCodes.NOT_FOUND, isOperational = false, name = 'Resource Not Found') {
        super(description, httpCode, isOperational, name);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends baseErrorClass_1.default {
    constructor(description, httpCode = httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED, isOperational = false, name = 'Unauthorised') {
        super(description, httpCode, isOperational, name);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class AccessDeniedError extends baseErrorClass_1.default {
    constructor(description, httpCode = httpStatusCodes_1.HttpStatusCodes.ACCESS_DENIED, isOperational = false, name = 'Access Denied') {
        super(description, httpCode, isOperational, name);
    }
}
exports.AccessDeniedError = AccessDeniedError;
