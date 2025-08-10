import { z } from "zod";

export const updateStoreSchema = z.object({
    id: z
        .string()
        .min(1, { message: "O id é obrigatório" }),
    name: z
        .string()
        .min(1, { message: "O nome é obrigatório" }),
    slogan: z
        .string()
        .optional(),
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

export type UpdateStoreDTO = z.infer<typeof updateStoreSchema>;