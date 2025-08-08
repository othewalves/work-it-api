import { z } from 'zod';

export const UpdateBookSchema = z.object({
    id: z.string().uuid({ message: 'ID inválido do livro' }),

    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    publisher: z.string().min(1).optional(),
    isbn: z.string().min(10).max(13).optional(),
    description: z.string().optional(),

    cover: z.string().url().optional(),
    banner: z.string().url().optional(),

    tags: z.array(z.string().uuid()).optional(),
});

export type UpdateBookDTO = z.infer<typeof UpdateBookSchema>;
