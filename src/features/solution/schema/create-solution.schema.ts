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
        .string()
        .trim(),
    store_id: z
        .string()
        .nonempty('Nome é obrigatório')
        .min(1, { message: 'Nome é obrigatório' }),
});

export type CreateSolutionDTO = z.infer<typeof CreateSolutionSchema>;