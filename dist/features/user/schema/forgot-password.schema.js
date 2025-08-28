"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = void 0;
const zod_1 = require("zod");
exports.forgotPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .min(6, { message: 'A senha deve ter ao menos 6 caracteres' })
        .regex(/[A-Z]/, { message: 'A senha deve conter ao menos uma letra maiúscula' })
        .regex(/[a-z]/, { message: 'A senha deve conter ao menos uma letra minúscula' })
        .regex(/[^A-Za-z0-9]/, { message: 'A senha deve conter ao menos um caractere especial' }),
    confirmPassword: zod_1.z
        .string()
        .nonempty('Senha antiga é obrigatória')
        .min(1, 'Senha antiga é obrigatória'),
    oldPassword: zod_1.z
        .string()
        .nonempty('Senha antiga é obrigatória')
        .min(1, 'Senha antiga é obrigatória'),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
});
