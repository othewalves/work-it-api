"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../../config/multer"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
const userController = new user_controller_1.UserController();
userRouter.get('/', isAuthenticated_1.isAuthenticated, userController.getUser.bind(userController));
userRouter.post('/', userController.create.bind(userController));
userRouter.put('/', isAuthenticated_1.isAuthenticated, upload.single('file'), userController.update.bind(userController));
userRouter.put('/forgot-password', isAuthenticated_1.isAuthenticated, userController.forgotPassword.bind(userController));
