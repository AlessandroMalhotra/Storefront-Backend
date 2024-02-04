"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCodes = void 0;
var HttpStatusCodes;
(function (HttpStatusCodes) {
    HttpStatusCodes[HttpStatusCodes["OK"] = 200] = "OK";
    HttpStatusCodes[HttpStatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCodes[HttpStatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCodes[HttpStatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCodes[HttpStatusCodes["ACCESS_DENIED"] = 403] = "ACCESS_DENIED";
    HttpStatusCodes[HttpStatusCodes["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(HttpStatusCodes || (HttpStatusCodes = {}));
exports.HttpStatusCodes = HttpStatusCodes;
