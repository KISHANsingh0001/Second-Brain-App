"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function userMiddleware(req, res, next) {
    const header = req.headers["authorization"];
    try {
        const decodedData = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
        //@ts-ignore
        req.userId = decodedData.id;
        next();
    }
    catch (err) {
        res.status(403).json({
            msg: "Invalid or expired token",
        });
    }
}
