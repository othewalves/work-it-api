"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSolutionSchema = void 0;
const zod_1 = require("zod");
exports.CreateSolutionSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .nonempty('Nome é obrigatório')
        .min(1, { message: 'Nome é obrigatório' }),
    price: zod_1.z
        .number()
        .min(1, { message: 'Preço é obrigatório' }),
    description: zod_1.z
        .string()
        .nonempty('Descrição é obrigatória')
        .min(1, { message: 'Descrição é obrigatório' }),
    duration: zod_1.z
        .number()
        .min(1, { message: 'Duração é obrigatória' }),
    tags: zod_1.z
        .array(zod_1.z.string().trim().min(1, "String não pode ser vazia").max(50, "Máximo de 50 caracteres"))
        .nonempty("O array não pode estar vazio")
        .max(20, "Máximo de 20 itens no array")
        .transform((arr) => Array.from(new Set(arr))),
    store_id: zod_1.z
        .string()
        .nonempty('Nome é obrigatório')
        .min(1, { message: 'Nome é obrigatório' }),
});
