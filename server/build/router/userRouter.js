"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const userRouter = express_1.default.Router();
userRouter.get("/", extractJWT_1.default, userController_1.loggedInUser);
userRouter.get("/:id", extractJWT_1.default, userController_1.userProfile);
userRouter.delete("/:id", extractJWT_1.default, userController_1.deleteUser);
userRouter.put("/:id", extractJWT_1.default, userController_1.editUser);
exports.default = userRouter;
