"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productHandler_1 = require("../../Handlers/productHandler");
const verifyToken_1 = __importDefault(require("../../Middleware/Authentication/verifyToken"));
const products = express_1.default.Router();
products.get('/', productHandler_1.index);
products.get('/:id', productHandler_1.show);
products.post('/newproduct', verifyToken_1.default, productHandler_1.create);
// products.get('/productcategory', 'dashboard file');
exports.default = products;
