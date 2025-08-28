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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStoreByOwner = exports.findUserById = exports.findStoreById = exports.updateStore = exports.updateUserToMerchant = exports.createStore = exports.findStoreByCNPJ = exports.listAllStores = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const listAllStores = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield client_1.default.store.findMany();
    return stores;
});
exports.listAllStores = listAllStores;
const findStoreByCNPJ = (cnpj) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield client_1.default.store.findFirst({
        where: {
            cnpj
        }
    });
    return store;
});
exports.findStoreByCNPJ = findStoreByCNPJ;
const createStore = (user_id_1, _a) => __awaiter(void 0, [user_id_1, _a], void 0, function* (user_id, { cnpj, description, email, name, phone, photo, slogan, category }) {
    const store = yield client_1.default.store.create({
        data: {
            cnpj,
            description,
            email,
            name,
            phone,
            photo,
            slogan,
            categoryId: category,
            userId: user_id
        },
        select: {
            id: true,
            cnpj: true,
            description: true,
            email: true,
            name: true,
            phone: true,
            photo: true,
            slogan: true,
            category: true,
            address: true,
        }
    });
    return store;
});
exports.createStore = createStore;
const updateUserToMerchant = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.update({
        where: {
            id: user_id
        },
        data: {
            role: 'MERCHANT'
        },
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            photo: true,
        }
    });
    return user;
});
exports.updateUserToMerchant = updateUserToMerchant;
const updateStore = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, description, email, phone, photo, slogan }) {
    const store = client_1.default.store.update({
        where: {
            id
        },
        data: {
            name,
            description,
            email,
            phone,
            photo,
            slogan
        }
    });
    return store;
});
exports.updateStore = updateStore;
const findStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.store.findFirst({
        where: {
            id
        },
    });
    return user;
});
exports.findStoreById = findStoreById;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
        }
    });
    return user;
});
exports.findUserById = findUserById;
const findStoreByOwner = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield client_1.default.store.findMany({
        where: {
            userId
        }
    });
    return stores;
});
exports.findStoreByOwner = findStoreByOwner;
