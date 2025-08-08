import { Request, Response } from "express";

import { BookService } from "./book.service";

import { CreateBookDTO, createBookSchema, UpdateBookDTO, UpdateBookSchema } from "./schema";

import { handleError } from "../../utils";

const bookService = new BookService();
class BookController {

    async listAll(req: Request, res: Response) {
        try {
            const books = await bookService.listAll();
            return res.status(200).json(books);
        } catch (error) {
            return handleError(error, res);
        }
    };

    async listById(req: Request, res: Response) {
        try {
            const { book_id } = req.params;
            const book = await bookService.listById(book_id);

            return res.status(200).json(book);
        } catch (error) {
            return handleError(error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { user_id } = req;

            if (!req.file) {
                handleError('error upload file', res)
            } else {
                const { filename } = req.file;

                const dataBook: CreateBookDTO = createBookSchema.parse(req.body);

                const book = await bookService.create(user_id, { ...dataBook, cover: filename });

                return res.status(200).json(book);
            }

        } catch (error) {
            return handleError(error, res);
        };
    };

    async update(req: Request, res: Response) {
        try {
            const { user_id } = req;
            if (!req.file) {
                handleError('error upload file', res);
            } else {

                const { filename } = req.file;

                const dataBook: UpdateBookDTO = UpdateBookSchema.parse(req.body);

                const book = await bookService.updateBook(user_id, { ...dataBook, cover: filename });

                return res.status(200).json(book);
            };
        } catch (error) {
            return handleError(error, res);
        };
    };

    async delete(req: Request, res: Response) {
        try {
            const { book_id } = req.params;

            const book = await bookService.deleteBook(book_id);

            return res.status(200).json({ book });

        } catch (error) {
            return handleError(error, res);
        };
    };
};

export { BookController };