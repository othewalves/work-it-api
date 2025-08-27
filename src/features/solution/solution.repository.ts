import prisma from "../../prisma/client";
import { CreateSolutionDTO } from "./schema";

export const create = async ({
    name,
    price,
    duration,
    description,
    tags,
    store_id

}: CreateSolutionDTO) => {
    const solution = await prisma.solution.create({
        data: {
            name,
            price,
            duration,
            description,
            tags,
            store_id
        }
    });

    return solution
}

export const storeExists = async (id: string) => {
    const store = await prisma.store.findFirst({
        where: {
            id
        }
    })

    return store;
}