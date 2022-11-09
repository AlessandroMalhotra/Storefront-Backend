"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../Models/user");
const user = new user_1.UserAccounts();
describe("Test user model functions", () => {
    it("GET all products in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield user.index();
        expect(user.index).toBeDefined();
    }));
    it("GET should return a list of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield user.index();
        expect(products).toEqual([]);
    }));
});
