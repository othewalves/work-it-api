"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreSchema = void 0;
const zod_1 = require("zod");
exports.createStoreSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: "O nome é obrigatório" }),
    slogan: zod_1.z
        .string()
        .optional(),
    category: zod_1.z
        .string()
        .min(1, { message: "A categoria é obrigatória" }),
    cnpj: zod_1.z
        .string()
        .min(14, { message: "O CNPJ deve ter no mínimo 14 caracteres" })
        .max(18, { message: "O CNPJ deve ter no máximo 18 caracteres" })
        .regex(/^\d{14}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
        message: "Formato de CNPJ inválido"
    }),
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
