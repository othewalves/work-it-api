import { z } from "zod";

const AuthUserSchema = z.object({
    email: z
        .string()
        .email('Digite um e-mail válido')
        .min(1, 'E-mail é obrigatório'),
    password: z
        .string()
        .min(1, 'A senha é obrigatória')
})

type AuthUserDTO = z.infer<typeof AuthUserSchema>;

export { AuthUserSchema, AuthUserDTO };