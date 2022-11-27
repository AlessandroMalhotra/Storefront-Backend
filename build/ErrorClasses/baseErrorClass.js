"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationError extends Error {
    // ApplicationError - This is the ancestor of all other error classes i.e all other error classes inherits from it.
    name;
    httpCode;
    isOperational;
    description;
    constructor(description, httpCode, isOperational, name) {
        super(description);
        // Object.setPrototypeOf(this, new.target.prototype);
        this.description = description;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.name = name;
    }
}
exports.default = ApplicationError;
