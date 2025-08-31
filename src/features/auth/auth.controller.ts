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

            res.cookie("token", auth.token, {
                httpOnly: true,
                secure: true, // precisa ser true em produção com HTTPS
                sameSite: "none", // ESSENCIAL para domínios diferentes (cross-site)
                maxAge: 1000 * 60 * 60 * 24, // 1 dia por exemplo
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
