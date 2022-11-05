"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const signJWT = (user, callback) => {
    try {
        jsonwebtoken_1.default.sign({
            username: user.username,
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: "HS256",
            expiresIn: "2h",
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            callback(error, null);
        }
        else {
            console.log("Unexpected error", error);
        }
    }
};
exports.default = signJWT;
