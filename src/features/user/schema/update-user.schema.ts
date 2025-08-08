import { z } from 'zod';

export const UpdateUserSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;