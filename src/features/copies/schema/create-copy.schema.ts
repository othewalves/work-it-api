import { z } from 'zod';

export const CreateCopySchema = z.object({
    bookId: z.string().uuid({ message: 'ID do livro inválido' }),
    quantity: z.string().min(1, { message: 'É preciso cadastrar pelo menos uma unidade do livro' })
});

export type CreateCopyDTO = z.infer<typeof CreateCopySchema>;
