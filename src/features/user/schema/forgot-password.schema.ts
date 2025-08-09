import { z } from "zod";

export const forgotPasswordSchema = z.object({
    password: z
        .string()
        .min(6, { message: 'A senha deve ter ao menos 6 caracteres' })
        .regex(/[A-Z]/, { message: 'A senha deve conter ao menos uma letra maiúscula' })
        .regex(/[a-z]/, { message: 'A senha deve conter ao menos uma letra minúscula' })
        .regex(/[^A-Za-z0-9]/, { message: 'A senha deve conter ao menos um caractere especial' }),
    confirmPassword: z
        .string()
        .nonempty('Senha antiga é obrigatória')
        .min(1, 'Senha antiga é obrigatória'),
    oldPassword: z
        .string()
        .nonempty('Senha antiga é obrigatória')
        .min(1, 'Senha antiga é obrigatória'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não conferem",
        path: ["confirmPassword"],
    });

export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;