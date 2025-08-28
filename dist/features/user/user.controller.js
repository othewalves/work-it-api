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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const schema_1 = require("./schema");
const utils_1 = require("../../utils");
const userService = new user_service_1.UserService();
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { filename } = req.file;
                const data = schema_1.createUserSchema.parse(req.body);
                const user = yield userService.create(Object.assign(Object.assign({}, data), { photo: 'exemplo.png' }));
                return res.status(200).json(user);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
            ;
        });
    }
    ;
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req;
                const user = yield userService.getUser(user_id);
                return res.status(200).json(user);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    (0, utils_1.handleError)('error upload file', res);
                }
                else {
                    const { filename } = req.file;
                    const { user_id } = req;
                    const data = schema_1.UpdateUserSchema.parse(req.body);
                    const user = yield userService.update(user_id, Object.assign(Object.assign({}, data), { photo: filename }));
                    return res.status(200).json(user);
                }
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.user_id;
                const data = schema_1.forgotPasswordSchema.parse(req.body);
                const payload = yield userService.forgotPassword(user_id, data);
                return res.status(200).json(payload);
            }
            catch (error) {
                (0, utils_1.handleError)(error, res);
            }
        });
    }
}
exports.UserController = UserController;
;
