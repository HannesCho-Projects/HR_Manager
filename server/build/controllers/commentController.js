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
exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = __importDefault(require("../models/User"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, text, author } = req.body;
    try {
        const createdComment = yield Comment_1.default.create({
            username,
            text,
            author,
        });
        const addCommentToUser = yield User_1.default.findOne({ username });
        (_a = addCommentToUser === null || addCommentToUser === void 0 ? void 0 : addCommentToUser.comments) === null || _a === void 0 ? void 0 : _a.push(createdComment);
        addCommentToUser === null || addCommentToUser === void 0 ? void 0 : addCommentToUser.save();
        return res.status(200).json({ createdComment });
    }
    catch (error) {
        return res.status(400).json({
            errorMessage: error,
        });
    }
});
exports.createComment = createComment;
