import { Router } from "express";
import { UserController } from "./user.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', userController.create.bind(userController));
userRouter.get('/me', isAuthenticated, userController.getUser.bind(userController));
userRouter.put('/me', isAuthenticated, userController.update.bind(userController));

export { userRouter };