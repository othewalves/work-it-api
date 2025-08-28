"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRouter = void 0;
const express_1 = require("express");
const store_controller_1 = require("./store.controller");
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../../config/multer"));
const storeRouter = (0, express_1.Router)();
exports.storeRouter = storeRouter;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
const storeController = new store_controller_1.StoreController();
storeRouter.get('/', storeController.listAll.bind(storeController));
storeRouter.get('/owner', isAuthenticated_1.isAuthenticated, storeController.listByOwner.bind(storeController));
storeRouter.get('/:store_id', storeController.listById.bind(storeController));
storeRouter.post('/', isAuthenticated_1.isAuthenticated, storeController.create.bind(storeController));
// storeRouter.post('/',
//     isAuthenticated,
//     upload.single('file'),
//     storeController.create.bind(storeController)
// );
storeRouter.put('/', isAuthenticated_1.isAuthenticated, upload.single('file'), storeController.update.bind(storeController));
