import prisma from "../../prisma/client"
import { CreateStoreDTO, UpdateStoreDTO } from "./schema";

export const findStoreByCNPJ = async (cnpj: string) => {
    const store = await prisma.store.findFirst({
        where: {
            cnpj
        }
    });

    return store;
}

export const createStore = async (user_id: string, { cnpj, description, email, name, phone, photo, slogan }: CreateStoreDTO) => {
    const store = await prisma.store.create({
        data: {
            cnpj,
            description,
            email,
            name,
            phone,
            photo,
            slogan,
            userId: user_id
        },
        select: {
            cnpj: true,
            description: true,
            email: true,
            name: true,
            phone: true,
            photo: true,
            slogan: true,
            address: true,
        }
    });

    return store;
};

export const updateUserToMerchant = async (user_id: string) => {
    const user = await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            role: 'MERCHANT'
        },
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            photo: true,
        }

    });

    return user;
}

export const updateStore = async ({ id, name, description, email, phone, photo, slogan }: UpdateStoreDTO) => {
    const store = prisma.store.update({
        where: {
            id
        },
        data: {
            name,
            description,
            email,
            phone,
            photo,
            slogan
        }
    });

    return store;
};

export const findStoreById = async (id: string) => {
    const user = await prisma.store.findFirst({
        where: {
            id
        },
    });

    return user;
}
export const findUserById = async (id: string) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
        }
    });

    return user;
}