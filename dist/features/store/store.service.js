"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.StoreService = void 0;
const utils_1 = require("../../utils");
const repository = __importStar(require("./store.repository"));
class StoreService {
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield repository.listAllStores();
            return stores;
        });
    }
    ;
    listById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield repository.findStoreById(id);
            return store;
        });
    }
    ;
    create(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('DADOS RECEBIDOS', data);
            const storeAlreadyExists = yield repository.findStoreByCNPJ(data.cnpj);
            if (storeAlreadyExists) {
                throw new utils_1.ExceptionError('CNPJ já existente', 401, '');
            }
            ;
            const store = yield repository.createStore(user_id, data);
            if (store) {
                yield repository.updateUserToMerchant(user_id);
            }
            return store;
        });
    }
    ;
    update(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const storeExists = yield repository.findStoreById(data.id);
            if (!storeExists) {
                throw new utils_1.ExceptionError('Loja não existe', 404, '');
            }
            ;
            const user = yield repository.findUserById(user_id);
            if (user.id !== storeExists.userId) {
                throw new utils_1.ExceptionError('Usuário inválido', 403, '');
            }
            ;
            const store = yield repository.updateStore(data);
            return store;
        });
    }
    listByOwner(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield repository.findUserById(userId);
            if (!userExists) {
                throw new utils_1.ExceptionError('Usuário inválido', 403, '');
            }
            ;
            const stores = yield repository.findStoreByOwner(userId);
            if (stores.length === 0) {
                throw new utils_1.ExceptionError('Não foi encontrado comércios relacionados ao usuário', 400, '');
            }
            return stores;
        });
    }
}
exports.StoreService = StoreService;
;
