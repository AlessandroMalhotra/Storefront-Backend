"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAPI_1 = __importDefault(require("./API/userAPI"));
const productAPI_1 = __importDefault(require("./API/productAPI"));
const orderAPI_1 = __importDefault(require("./API/orderAPI"));
const router = express_1.default.Router();
router.use('/users', userAPI_1.default);
router.use('/products', productAPI_1.default);
router.use('/orders', orderAPI_1.default);
exports.default = router;
