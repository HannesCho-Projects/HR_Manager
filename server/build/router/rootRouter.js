"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const rootRouter = express_1.default.Router();
rootRouter.get("/", extractJWT_1.default, userController_1.userList);
rootRouter.post("/signup", userController_1.postSignup);
rootRouter.post("/login", userController_1.postLogin);
exports.default = rootRouter;
