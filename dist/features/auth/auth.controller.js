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
exports.AuthUserController = void 0;
const auth_service_1 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
const utils_1 = require("../../utils");
class AuthUserController {
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ authenticated: true });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = auth_schema_1.AuthUserSchema.parse(req.body);
                const { token, user } = yield new auth_service_1.AuthUserService().login(data);
                const ONE_DAY = 1000 * 60 * 60 * 24;
                res.cookie("token", token, {
                    httpOnly: true, // não acessível via JS -> protege de XSS
                    secure: process.env.NODE_ENV === "production", // só HTTPS em prod
                    sameSite: "none", // essencial para funcionar em domínios diferentes (Vercel + Railway)
                    maxAge: ONE_DAY,
                    path: "/", // garante que seja enviado em todas as rotas
                    domain: process.env.COOKIE_DOMAIN || undefined,
                    // exemplo: ".reservae-pi.vercel.app" se precisar compartilhar entre subdomínios
                });
                return res.status(200).json({
                    success: true,
                    user
                });
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('workit_token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'none',
                });
                res.status(200).json({ message: 'Logout feito com sucesso' });
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
}
exports.AuthUserController = AuthUserController;
