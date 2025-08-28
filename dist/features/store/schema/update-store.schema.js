"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSchema = void 0;
const zod_1 = require("zod");
exports.updateStoreSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .min(1, { message: "O id é obrigatório" }),
    name: zod_1.z
        .string()
        .min(1, { message: "O nome é obrigatório" }),
    slogan: zod_1.z
        .string()
        .optional(),
    description: zod_1.z
        .string()
        .optional(),
    phone: zod_1.z
        .string()
        .min(8, { message: "O telefone deve ter no mínimo 8 dígitos" })
        .nonempty({ message: "É necessário informar pelo menos um telefone" }),
    email: zod_1.z
        .string()
        .email({ message: "Digite um e-mail válido" }),
    photo: zod_1.z
        .string()
        .url({ message: "A foto deve ser uma URL válida" })
        .optional(),
});
