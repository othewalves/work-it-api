import { Router } from "express";
import { AuthUserController } from "./auth.controller";

const authRouter = Router();

const authController = new AuthUserController();

authRouter.post('/sign-in', authController.handle.bind(authController));

export { authRouter }