import prisma from "../prisma/client";

export const hasPermission = async (id: string) => {
    const isLibrarian = await prisma.user.findFirst({
        where: {
            id
        }
    });

    return isLibrarian.role === 'BIBLIOTECARIO' ? true : false;
};