import { Request, Response } from "express";

import { UserService } from "./user.service";

import { UpdateUserSchema, UpdateUserDTO, CreateUserDTO, createUserSchema, ForgotPasswordDTO, forgotPasswordSchema } from "./schema";

import { handleError } from "../../utils";

const userService = new UserService();

class UserController {
    async create(req: Request, res: Response) {
        try {

            if (!req.file) {
                handleError('error upload file', res)
            } else {
                const { filename } = req.file;

                const data: CreateUserDTO = createUserSchema.parse(req.body);

                const user = await userService.create({ ...data, photo: filename });

                return res.status(200).json(user);
            }
        } catch (error) {
            return handleError(error, res);
        };
    };

    async getUser(req: Request, res: Response) {
        try {
            const { user_id } = req;

            const user = await userService.getUser(user_id);

            return res.status(200).json(user)
        } catch (error) {
            return handleError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (!req.file) {
                handleError('error upload file', res)
            } else {
                const { filename } = req.file;

                const { user_id } = req;

                const data: UpdateUserDTO = UpdateUserSchema.parse(req.body);

                const user = await userService.update(user_id, { ...data, photo: filename });

                return res.status(200).json(user);
            }
        } catch (error) {
            return handleError(error, res);
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const user_id = req.user_id;

            const data: ForgotPasswordDTO = forgotPasswordSchema.parse(req.body);

            const payload = await userService.forgotPassword(user_id, data);

            return res.status(200).json(payload);

        } catch (error) {
            handleError(error, res)
        }
    }
};

export { UserController };