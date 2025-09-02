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

            const { token, user } = await new AuthUserService().login(data);

            const ONE_DAY = 1000 * 60 * 60 * 24;

            res.cookie("workit_token", token, {
                httpOnly: true,
                secure: true,        // false em dev, true em produção com HTTPS
                sameSite: "none",     // ou "lax" se front e back forem no mesmo domínio
                maxAge: ONE_DAY // 1 dia
            });

            return res.status(200).json({
                success: true,
                user
            });
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
