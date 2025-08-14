import { z } from "zod";

export const createStoreSchema = z.object({
    name: z
        .string()
        .min(1, { message: "O nome é obrigatório" }),
    slogan: z
        .string()
        .optional(),
    category: z
        .string()
        .min(1, { message: "A categoria é obrigatória" }),
    cnpj: z
        .string()
        .min(14, { message: "O CNPJ deve ter no mínimo 14 caracteres" })
        .max(18, { message: "O CNPJ deve ter no máximo 18 caracteres" })
        .regex(/^\d{14}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
            message: "Formato de CNPJ inválido"
        }),
    description: z
        .string()
        .optional(),
    phone: z
        .array(
            z
                .string()
                .min(8, { message: "O telefone deve ter no mínimo 8 dígitos" })
        )
        .nonempty({ message: "É necessário informar pelo menos um telefone" }),
    email: z
        .string()
        .email({ message: "Digite um e-mail válido" }),
    photo: z
        .string()
        .url({ message: "A foto deve ser uma URL válida" })
        .optional(),
});

export type CreateStoreDTO = z.infer<typeof createStoreSchema>;