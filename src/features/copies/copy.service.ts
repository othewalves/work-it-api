import { hasPermission } from './../../utils/has-permission';
import { CreateCopyDTO } from "./schema";
import * as repository from './copy.repository';
import { ExceptionError } from "../../utils";
import { Copy } from '../../generated/prisma';
class CopyService {
    async listAll(code: string) {
        const copy = await repository.listAll(code);

        return copy;
    };

    async create(user_id: string, bookId: string, quantity: string) {

        const isLibrarian = hasPermission(user_id);

        if (!isLibrarian) {
            throw new ExceptionError('Operação não autorizada', 403, '');
        };

        const bookExists = await repository.findBookById(bookId);

        if (!bookExists) {
            throw new ExceptionError('Livro não encontrado', 404, 'book')
        };


        const { code, title } = bookExists;

        const copies = [];
        const quantityAlreadyExists = await repository.countCopiesByBookId(bookId);
        console.log(quantityAlreadyExists);


        for (let i = 1; i <= parseInt(quantity); i++) {

            const newCode = `${code}-${quantityAlreadyExists + i}`;

            const copy = await repository.createCopy(
                bookId,
                {
                    code: newCode,
                    name: title,
                } as Copy
            );
            copies.push(copy)
        };

        return copies;
    };

};

export { CopyService };