import { z } from "zod";

export const CreateSolutionSchema = z.object({
    name: z
        .string()
        .nonempty('Nome é obrigatório')
        .min(1, { message: 'Nome é obrigatório' }),
    price: z
        .number()
        .min(1, { message: 'Preço é obrigatório' }),
    description: z
        .string()
        .nonempty('Descrição é obrigatória')
        .min(1, { message: 'Descrição é obrigatório' }),
    duration: z
        .number()
        .min(1, { message: 'Duração é obrigatória' }),
    tags: z
        .array(
            z.string().trim().min(1, "String não pode ser vazia").max(50, "Máximo de 50 caracteres")
        )
        .nonempty("O array não pode estar vazio")
        .max(20, "Máximo de 20 itens no array")
        .transform((arr) => Array.from(new Set(arr))),
    store_id: z
        .string()
        .nonempty('Nome é obrigatório')
        .min(1, { message: 'Nome é obrigatório' }),
});

export type CreateSolutionDTO = z.infer<typeof CreateSolutionSchema>;