"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserSchema = void 0;
const zod_1 = require("zod");
const AuthUserSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Digite um e-mail válido')
        .min(1, 'E-mail é obrigatório'),
    password: zod_1.z
        .string()
        .min(1, 'A senha é obrigatória')
});
exports.AuthUserSchema = AuthUserSchema;
