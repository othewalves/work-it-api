import { Router } from "express";
import { UserController } from "./user.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

import multer from "multer";
import uploadConfig from '../../config/multer';

const userRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const userController = new UserController();

userRouter.get('/',
    isAuthenticated,
    userController.getUser.bind(userController)
);

userRouter.post('/',
    upload.single('file'),
    userController.create.bind(userController)
);

userRouter.put('/',
    isAuthenticated,
    upload.single('file'),
    userController.update.bind(userController)
);

export { userRouter };