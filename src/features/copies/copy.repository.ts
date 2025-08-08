import { Copy } from "../../generated/prisma";
import prisma from "../../prisma/client"

import { CreateCopyDTO } from "./schema"

export const listAll = async (code: string) => {
    const copy = await prisma.copy.findMany({
        where: {
            code
        }
    });

    return copy;
}

export const findBookById = async (bookId: string) => {
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }, select: {
            code: true,
            title: true
        }
    });

    return book;
}

export async function countCopiesByBookId(bookId: string): Promise<number> {
    const count = await prisma.copy.count({
        where: { bookId: bookId },
    });
    return count;
}

export const findCopyByBookId = async (bookId: string) => {
    const copy = await prisma.copy.findMany({
        where: {
            bookId: bookId
        }
    });

    return copy;
}

export const createCopy = async (
    bookId,
    { name, code, }: Copy
) => {
    const copy = await prisma.copy.create({
        data: {
            name,
            code,
            bookId,
        }
    });
    return copy;
};
