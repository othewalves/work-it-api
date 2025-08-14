import prisma from "../../prisma/client";
import { CreateCategoryDTO } from "./schema";

export const listAllCategories = async () => {
    const categories = await prisma.category.findMany();

    return categories;
};

export const findCategoryById = async (categoryId: string) => {
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        },
        select: {
            id: true,
            name: true
        }
    });

    return category;
};

export const findCategoryByName = async (name: string) => {
    const category = await prisma.category.findUnique({
        where: {
            name
        }
    });

    return category;
};

export const createCategory = async ({ name }: CreateCategoryDTO) => {
    const category = await prisma.category.create({
        data: {
            name
        }
    });

    return category;
};
