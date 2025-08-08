import { hash } from "bcryptjs";
import prisma from "../../prisma/client";

import { User } from "./user.entity";
import { CreateUserDTO, UpdateUserDTO } from "./schema";

export const findById = async (id: string) => {
    const user: User = await prisma.user.findFirst({
        where: {
            id
        }
    });
    return user ?? null;
}

export const findByCPF = async (cpf: string) => {
    const user: User = await prisma.user.findFirst({
        where: {
            cpf
        }
    });
    return user ?? null;
}

export const findByEmail = async (email: string) => {
    const user: User = await prisma.user.findFirst({
        where: {
            email
        }
    });
    return user ?? null;
}

export const createUser = async (data: CreateUserDTO) => {
    const passwordEncrypted = await hash(data.password, 8);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            cpf: data.cpf,
            phone: data.phone,
            role: data.role,
            password: passwordEncrypted
        }, select: {
            email: true,
            name: true,
            id: true,
            role: true
        }
    });

    return user;
}

export const updateUser = async (id: string, data: UpdateUserDTO) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: data,
    });

    return user;
}