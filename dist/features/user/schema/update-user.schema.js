"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = void 0;
const zod_1 = require("zod");
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'O nome é obrigatório'),
    photo: zod_1.z
        .string()
        .optional(),
    phone: zod_1.z
        .string()
        .min(1, { message: 'O telefone é obrigatório' })
        .regex(/^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/, { message: 'Telefone inválido' }),
});
