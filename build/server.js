"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./Routes/index"));
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST || '127.0.0.1';
const app = (0, express_1.default)();
app.use('/', index_1.default);
app.listen(PORT, HOST, function () {
    console.log(`Server listening on specified ${PORT} and ${HOST}`);
});
