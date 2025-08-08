import z from 'zod';

export const CreateCategorySchema = z.object({
    name: z.string({
        required_error: 'Categoria é obrigatória',
    }).min(1, 'Categoria é obrigatória')
        .nonempty()
    ,
});

export type CreateCategoryDTO = {
    name: string;
};