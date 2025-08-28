"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressSchema = void 0;
const zod_1 = require("zod");
exports.createAddressSchema = zod_1.z.object({
    zipCode: zod_1.z
        .string()
        .min(8, { message: "O CEP deve ter no mínimo 8 caracteres" }),
    street: zod_1.z
        .string()
        .min(1, { message: "A rua é obrigatória" }),
    number: zod_1.z
        .string()
        .min(1, { message: "O número é obrigatório" }),
    neighborhood: zod_1.z
        .string()
        .min(1, { message: "O bairro é obrigatório" }),
    city: zod_1.z
        .string()
        .min(1, { message: "A cidade é obrigatória" }),
    state: zod_1.z
        .string()
        .length(2, { message: "O estado deve ter 2 caracteres" }),
    storeId: zod_1.z
        .string()
        .uuid()
        .optional(),
});
