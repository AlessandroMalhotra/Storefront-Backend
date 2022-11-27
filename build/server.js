"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./Routes/index"));
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST;
const corsOptions = {
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use('/', index_1.default);
app.get('/', async (req, res) => {
    res.send('Welcome to storefront');
});
app.listen(PORT, HOST, function () {
    console.log(`Server listening on specified port ${PORT} and host ${HOST}`);
});
