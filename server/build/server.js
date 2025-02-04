"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./db");
require("./models/User");
require("./models/Comment");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/config"));
const rootRouter_1 = __importDefault(require("./router/rootRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const commentRouter_1 = __importDefault(require("./router/commentRouter"));
const app = (0, express_1.default)();
const logger = (0, morgan_1.default)("dev");
app.use((0, cors_1.default)());
app.use(logger);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", rootRouter_1.default);
app.use("/user", userRouter_1.default);
app.use("/comment", commentRouter_1.default);
const handleListening = () => console.log(`✅ Server listenting on port http://localhost:${config_1.default.server.port}`);
app.listen(config_1.default.server.port, handleListening);
