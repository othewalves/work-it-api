"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const store_service_1 = require("./store.service");
const utils_1 = require("../../utils");
const schema_1 = require("./schema");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storeService = new store_service_1.StoreService();
class StoreController {
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stores = yield storeService.listAll();
                return res.status(200).json(stores);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
            ;
        });
    }
    ;
    listByOwner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.user_id;
                const stores = yield storeService.listByOwner(user_id);
                return res.status(200).json(stores);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
            ;
        });
    }
    ;
    listById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id } = req.params;
                const store = yield storeService.listById(store_id);
                return res.status(200).json(store);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.files || Object.keys(req.files).length === 0) {
                    (0, utils_1.handleError)('error upload file', res);
                }
                else {
                    // const { filename } = req.file;
                    const file = req.files['file'];
                    const resultFile = yield new Promise((resolve, reject) => {
                        cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                            if (error) {
                                console.log('erro', error);
                                reject(error);
                                return;
                            }
                            resolve(result);
                        }).end(file.data);
                    });
                    const user_id = req.user_id;
                    const data = schema_1.createStoreSchema.parse(req.body);
                    const store = yield storeService.create(user_id, Object.assign(Object.assign({}, data), { photo: resultFile.url }));
                    return res.status(200).json(store);
                }
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    (0, utils_1.handleError)('error upload file', res);
                }
                else {
                    // const { filename } = req.file;
                    const file = req.files['file'];
                    const resultFile = yield new Promise((resolve, reject) => {
                        cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                            if (error) {
                                console.log('erro', error);
                                reject(error);
                                return;
                            }
                            resolve(result);
                        }).end(file.data);
                    });
                    const user_id = req.user_id;
                    const data = schema_1.updateStoreSchema.parse(req.body);
                    const store = yield storeService.update(user_id, Object.assign(Object.assign({}, data), { photo: resultFile.url }));
                    return res.status(200).json(store);
                }
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
}
exports.StoreController = StoreController;
;
