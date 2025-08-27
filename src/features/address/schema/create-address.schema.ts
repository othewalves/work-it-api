import { z } from "zod";

export const createAddressSchema = z.object({
    zipCode: z
        .string()
        .min(8, { message: "O CEP deve ter no mínimo 8 caracteres" }),
    street: z
        .string()
        .min(1, { message: "A rua é obrigatória" }),
    number: z
        .string()
        .min(1, { message: "O número é obrigatório" }),
    neighborhood: z
        .string()
        .min(1, { message: "O bairro é obrigatório" }),
    city: z
        .string()
        .min(1, { message: "A cidade é obrigatória" }),
    state: z
        .string()
        .length(2, { message: "O estado deve ter 2 caracteres" }),
    storeId: z
        .string()
        .uuid()
        .optional(),
});

export type CreateAddressDTO = z.infer<typeof createAddressSchema>;
