import { z } from 'zod';

export const UpdateUserSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório'),
    photo: z
        .string()
        .optional(),
    phone: z
        .string()
        .min(1, { message: 'O telefone é obrigatório' })
        .regex(
            /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
            { message: 'Telefone inválido' }
        ),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;