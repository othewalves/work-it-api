import { CreateBookDTO, UpdateBookDTO } from './schema';

import * as repository from './book.repository';

import { ExceptionError, hasPermission } from "../../utils";

class BookService {

    async listAll() {
        const books = await repository.getAllBooks();
        return books;
    }

    async listById(bookId: string) {
        const book = await repository.findBookById(bookId);

        if (!book) {
            return new ExceptionError('Livro não encontrado :(', 404, 'book');
        }

        return book;
    }

    async create(user_id: string, dataBook: CreateBookDTO) {

        const isLibrarian = await hasPermission(user_id);

        if (!isLibrarian) {
            return new ExceptionError('Operação inválida', 403, 'user');
        }

        const bookExists = await repository.findBookByTitle(dataBook.title);

        if (bookExists) {
            throw new ExceptionError("Livro já cadastrado", 409, 'book');

        };


        const book = await repository.createBook(dataBook);

        const quantity = parseInt(dataBook.quantity);
        const copies = [];

        for (let i = 1; i <= quantity; i++) {
            const copy = await repository.createCopy(i, book.id, dataBook);
            copies.push(copy)
        }

        return book;
    };

    async updateBook(user_id: string, dataBook: UpdateBookDTO) {

        const isLibrarian = await hasPermission(user_id);

        if (!isLibrarian) {
            return new ExceptionError('Operação inválida', 403, 'user');
        }

        const bookExists = await repository.findBookById(dataBook.id);

        if (!bookExists) {
            throw new ExceptionError('Não foi possível atualizar o livro', 400, 'book');
        }

        const book = await repository.updateBook(dataBook);
        return book;
    };

    async deleteBook(id: string) {
        const bookExists = await repository.findBookById(id);

        if (!bookExists) {
            throw new ExceptionError('Livro inválido', 404, 'id');
        };

        const book = await repository.deleteBook(id);

        return book;

    };

};

export { BookService };