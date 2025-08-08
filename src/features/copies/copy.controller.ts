import { Request, Response } from "express";
import { CopyService } from "./copy.service";
import { CreateCopySchema } from "./schema";
import { handleError } from "../../utils";

const copyService = new CopyService();

class CopyController {
    async listAll(req: Request, res: Response) {
        const { code } = req.params;

        const copies = await copyService.listAll(code);

        return res.status(200).json(copies);
    };

    async create(req: Request, res: Response) {

        try {
            const { user_id } = req.params;

            const { bookId, quantity } = CreateCopySchema.parse(req.body)

            const copies = await copyService.create(user_id, bookId, quantity);

            return res.status(200).json(copies);

        } catch (error) {
            console.log('caiu aqui')
            return handleError(error, res);
        }
    }
};

export { CopyController };