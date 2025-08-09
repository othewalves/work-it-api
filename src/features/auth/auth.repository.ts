import prisma from "../../prisma/client";
import { AuthUserDTO } from "./auth.schema";

export const loginUser = async (data: AuthUserDTO) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    return user;
}