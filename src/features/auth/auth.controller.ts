import { Request, Response } from "express";
import { AuthUserService } from "./auth.service";
import { AuthUserDTO, AuthUserSchema } from "./auth.schema";
import { handleError } from "../../utils";

class AuthUserController {
    async check(req: Request, res: Response) {
        return res.status(200).json({ authenticated: true });
    }
    async login(req: Request, res: Response) {
        try {
            const data: AuthUserDTO = AuthUserSchema.parse(req.body);

            const auth = await new AuthUserService().login(data);

            const isProduction = process.env.NODE_ENV === 'production';

            res.cookie("workit_token", auth.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 15 * 24 * 60 * 60 * 1000,
                path: "/",
            });

            return res.status(200).json({ user: auth.user });
        } catch (error) {
            return handleError(error, res);
        }
    }
    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('workit_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            });
            res.status(200).json({ message: 'Logout feito com sucesso' });

        } catch (error) {
            return handleError(error, res)
        }
    }
}

export { AuthUserController };
