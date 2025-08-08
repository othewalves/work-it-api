import { Router } from "express";

import multer from "multer";
import uploadConfig from '../../config/multer';

import { BookController } from "./book.controller";

import { isAuthenticated } from "../../middlewares/isAuthenticated";

const bookRouter = Router();
const bookController = new BookController();
const upload = multer(uploadConfig.upload('./tmp'));

bookRouter.get('/', bookController.listAll.bind(bookController));

bookRouter.get('/:book_id', bookController.listById.bind(bookController));

bookRouter.post('/',
    isAuthenticated,
    upload.single('file'),
    bookController.create.bind(bookController)
);

bookRouter.put('/',
    isAuthenticated,
    upload.single('file'),
    bookController.update.bind(bookController)
);

bookRouter.delete('/:book_id',
    isAuthenticated,
    bookController.delete.bind(bookController)
);

export { bookRouter };