import { Request, Response } from "express";

import { AuthUserDTO, AuthUserSchema } from "./auth.schema";
import { AuthUserService } from "./auth.service";

import { handleError } from "../../utils";

class AuthUserController {
    async handle(req: Request, res: Response) {
        try {
            const authData: AuthUserDTO = AuthUserSchema.parse(req.body);

            const auth = await new AuthUserService().execute(authData);

            return res.status(200).json(auth);

        } catch (error) {
            return handleError(error, res);
        };
    };
};
export { AuthUserController };