"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
const validRoles = ['CLIENT', 'MERCHANT', 'ADMIN'];
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: 'O nome é obrigatório' }),
    email: zod_1.z
        .string()
        .email({ message: 'Email inválido' }),
    cpf: zod_1.z
        .string()
        .min(11, { message: 'CPF inválido' })
        .max(14, { message: 'CPF inválido' }),
    phone: zod_1.z
        .string()
        .min(1, { message: 'O telefone é obrigatório' })
        .regex(/^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/, { message: 'Telefone inválido' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'A senha deve ter ao menos 6 caracteres' })
        .regex(/[A-Z]/, { message: 'A senha deve conter ao menos uma letra maiúscula' })
        .regex(/[a-z]/, { message: 'A senha deve conter ao menos uma letra minúscula' })
        .regex(/[^A-Za-z0-9]/, { message: 'A senha deve conter ao menos um caractere especial' }),
    role: zod_1.z
        .enum(validRoles, {
        errorMap: () => ({ message: 'Tipo de usuário inválido.' })
    })
        .optional(),
    photo: zod_1.z
        .string()
        .optional()
});
