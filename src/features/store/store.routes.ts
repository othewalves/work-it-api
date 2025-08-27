import { Router } from "express";
import { StoreController } from "./store.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

import multer from "multer";
import uploadConfig from '../../config/multer';

const storeRouter = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const storeController = new StoreController();

storeRouter.get('/',
    storeController.listAll.bind(storeController)
);

storeRouter.get('/owner',
    isAuthenticated,
    storeController.listByOwner.bind(storeController)
);

storeRouter.get('/:store_id',
    storeController.listById.bind(storeController)
);

storeRouter.post('/',
    isAuthenticated,
    upload.single('file'),
    storeController.create.bind(storeController)
);

storeRouter.put('/',
    isAuthenticated,
    upload.single('file'),
    storeController.update.bind(storeController)
);


export { storeRouter };