import { Request, Response } from "express";
import { StoreService } from "./store.service";
import { handleError } from "../../utils";
import { CreateStoreDTO, createStoreSchema, UpdateStoreDTO, updateStoreSchema } from "./schema";
import { UploadedFile } from "express-fileupload";

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { error } from "console";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

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

    async listByOwner(req: Request, res: Response) {
        try {
            const user_id = req.user_id;
            const stores = await storeService.listByOwner(user_id);

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
            if (!req.files || Object.keys(req.files).length === 0) {

                handleError('error upload file', res)
            } else {
                // const { filename } = req.file;

                const file: UploadedFile = req.files['file']

                const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            console.log('erro', error)
                            reject(error)
                            return
                        }
                        resolve(result)
                    }).end(file.data)
                })

                const user_id = req.user_id;

                const data: CreateStoreDTO = createStoreSchema.parse(req.body);

                const store = await storeService.create(user_id, { ...data, photo: resultFile.url });

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
                // const { filename } = req.file;
                const file: UploadedFile = req.files['file']

                const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            console.log('erro', error)
                            reject(error)
                            return
                        }
                        resolve(result)
                    }).end(file.data)
                })

                const user_id = req.user_id;

                const data: UpdateStoreDTO = updateStoreSchema.parse(req.body);

                const store = await storeService.update(user_id, { ...data, photo: resultFile.url });

                return res.status(200).json(store);
            }
        } catch (error) {
            return handleError(error, res)
        }
    }
};

export { StoreController };