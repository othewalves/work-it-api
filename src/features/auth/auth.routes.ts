import { Router } from "express";
import { AuthUserController } from "./auth.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const authRouter = Router();

const authController = new AuthUserController();

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/logout', authController.logout.bind(authController));
authRouter.get('/check', isAuthenticated, authController.check.bind(authController));

export { authRouter }