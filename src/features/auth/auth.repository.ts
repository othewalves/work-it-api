import prisma from "../../prisma/client";
import { AuthUserDTO } from "./auth.schema";

export const loginUser = async (data: AuthUserDTO) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            store: true,
            password: true
        }
    });
    return user;
};
