import { z } from 'zod';

const validRoles = ['CLIENT', 'MERCHANT', 'ADMIN'] as const;

export const createUserSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'O nome é obrigatório' }),
    email: z
        .string()
        .email({ message: 'Email inválido' }),
    cpf: z
        .string()
        .min(11, { message: 'CPF inválido' })
        .max(14, { message: 'CPF inválido' }),
    phone: z
        .string()
        .min(1, { message: 'O telefone é obrigatório' })
        .regex(
            /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
            { message: 'Telefone inválido' }
        ),
    password: z
        .string()
        .min(6, { message: 'A senha deve ter ao menos 6 caracteres' }),
    role: z
        .enum(validRoles, {
            errorMap: () => ({ message: 'Tipo de usuário inválido.' })
        }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
