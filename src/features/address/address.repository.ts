import prisma from "../../prisma/client"
import { CreateAddressDTO } from "./schema/"

export const findUserById = async (userId: string) => {
    const user = prisma.user.findFirst({
        where: {
            id: userId
        }
    });
};

export const create = async (
    {
        city,
        neighborhood,
        number,
        state,
        storeId,
        street,
        userId,
        zipCode
    }: CreateAddressDTO
) => {
    const address = await prisma.address.create({
        data: {
            city,
            neighborhood,
            number,
            state,
            storeId,
            street,
            userId,
            postalCode: zipCode
        }
    });

    return address;
};