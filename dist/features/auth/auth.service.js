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
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const auth_repository_1 = require("./auth.repository");
const utils_1 = require("../../utils");
class AuthUserService {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth_repository_1.loginUser)(data);
            if (!user) {
                throw new utils_1.ExceptionError(`E-mail e/ou senha inválidos`, 400, 'email');
            }
            ;
            const verifyPassword = yield (0, bcryptjs_1.compare)(data.password, user === null || user === void 0 ? void 0 : user.password);
            if (!verifyPassword) {
                throw new utils_1.ExceptionError(`E-mail e/ou senha inválidos`, 400, 'password');
            }
            const token = (0, utils_1.generateToken)(user);
            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    store: user.store
                },
                token: token
            };
        });
    }
    ;
}
exports.AuthUserService = AuthUserService;
;
