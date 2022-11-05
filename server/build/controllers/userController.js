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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedInUser = exports.deleteUser = exports.editUser = exports.userProfile = exports.postLogin = exports.postSignup = exports.userList = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const config_1 = __importDefault(require("../config/config"));
const userList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield User_1.default.find();
        return res.status(200).json(allUser);
    }
    catch (error) {
        return res.status(400).json({
            errorMessage: error,
        });
    }
});
exports.userList = userList;
const postSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, password2, firstName, lastName, email, street, housenumber, zipcode, city, country, role, } = req.body;
    if (password !== password2) {
        return res
            .status(403)
            .json({ errorMessage: "Password confirmation does not match." });
    }
    const exists = yield User_1.default.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(403).json({
            errorMessage: "This username/email is already taken.",
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        const createdUser = yield User_1.default.create({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            street,
            housenumber,
            zipcode,
            city,
            country,
            role,
        });
        res.status(200).json({ createdUser });
    }
    catch (error) {
        return res.status(400).json({
            errorMessage: error,
        });
    }
});
exports.postSignup = postSignup;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username });
    if (!user) {
        return res.status(400).json({
            errorMessage: "An account with this username does not exists.",
        });
    }
    try {
        const ok = yield bcrypt_1.default.compare(password, user.password);
        if (!ok) {
            return res.status(400).json({
                errorMessage: "Wrong password",
            });
        }
        else {
            (0, signJWT_1.default)(user, (error, token) => {
                if (error) {
                    return res.status(500).json({
                        message: error.message,
                        error: error,
                    });
                }
                else if (token) {
                    res.locals.token = token;
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        user: user,
                    });
                }
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                error,
            });
        }
        else {
            console.log("Unexpected error", error);
        }
    }
});
exports.postLogin = postLogin;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({
            errorMessage: error,
        });
    }
});
exports.userProfile = userProfile;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, firstName, lastName, email, street, housenumber, zipcode, city, country, role, } = req.body;
    try {
        const editedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
            username,
            firstName,
            lastName,
            email,
            street,
            housenumber,
            zipcode,
            city,
            country,
            role,
        });
        return res.status(200).json(editedUser);
    }
    catch (error) {
        return res.status(400).json({
            errorMessage: error,
        });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedUser);
    }
    catch (error) {
        return res.status(400).json({
            errorMessage: error,
        });
    }
});
exports.deleteUser = deleteUser;
const loggedInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret);
            const currentUserName = decoded.username;
            const currentUser = yield User_1.default.findOne({ username: currentUserName });
            return res.status(200).json(currentUser);
        }
        catch (error) {
            return res.status(404).json({
                message: error,
                error,
            });
        }
    }
    else {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
});
exports.loggedInUser = loggedInUser;
