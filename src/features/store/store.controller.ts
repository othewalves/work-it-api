import { Request, Response } from "express";
import { StoreService } from "./store.service";
import { handleError } from "../../utils";
import { CreateStoreDTO, createStoreSchema, UpdateStoreDTO, updateStoreSchema } from "./schema";

const storeService = new StoreService();

class StoreController {

    async listAll(req: Request, res: Response) {
        try {
            const stores = await storeService.listAll();

            return res.status(200).json(stores);
        } catch (error) {
            return handleError(error, res);
        };
    };

    async listById(req: Request, res: Response) {
        try {
            const { store_id } = req.params;

            const store = await storeService.listById(store_id);

            return res.status(200).json(store);


        } catch (error) {
            return handleError(error, res)
        }
    }

    async create(req: Request, res: Response) {
        try {
            if (!req.file) {

                handleError('error upload file', res)
            } else {
                const { filename } = req.file;

                const user_id = req.user_id;

                const data: CreateStoreDTO = createStoreSchema.parse(req.body);

                const store = await storeService.create(user_id, { ...data, photo: filename });

                return res.status(200).json(store);
            }

        } catch (error) {
            return handleError(error, res)
        }
    };

    async update(req: Request, res: Response) {
        try {
            if (!req.file) {
                handleError('error upload file', res)
            } else {
                const { filename } = req.file;

                const user_id = req.user_id;

                const data: UpdateStoreDTO = updateStoreSchema.parse(req.body);

                const store = await storeService.update(user_id, { ...data, photo: filename });

                return res.status(200).json(store);
            }
        } catch (error) {
            return handleError(error, res)
        }
    }
};

export { StoreController };