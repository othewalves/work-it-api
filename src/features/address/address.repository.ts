import prisma from "../../prisma/client"
import { CreateAddressDTO } from "./schema/"

export const findStore = async (id: string) => {
    const store = prisma.store.findFirst({
        where: {
            id
        }
    });
    return store;
};

export const create = async (
    {
        city,
        neighborhood,
        number,
        state,
        storeId,
        street,
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
            postalCode: zipCode
        }
    });

    return address;
};