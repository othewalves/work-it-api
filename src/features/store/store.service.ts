import { ExceptionError } from "../../utils";
import { CreateStoreDTO, UpdateStoreDTO } from "./schema";
import * as repository from './store.repository';

class StoreService {

    async listAll() {
        const stores = await repository.listAllStores();
        return stores;
    };

    async listById(id: string) {
        const store = await repository.findStoreById(id);

        return store;
    };

    async create(user_id: string, data: CreateStoreDTO) {
        console.log('DADOS RECEBIDOS', data);

        const storeAlreadyExists = await repository.findStoreByCNPJ(data.cnpj);

        if (storeAlreadyExists) {
            throw new ExceptionError('CNPJ já existente', 401, '');
        };
        console.log('CAIU aqui? 1');

        const store = await repository.createStore(user_id, data);

        if (store) {
            await repository.updateUserToMerchant(user_id);
        }

        console.log('CAIU aqui? 2');
        return store;
    };

    async update(user_id: string, data: UpdateStoreDTO) {
        const storeExists = await repository.findStoreById(data.id);

        if (!storeExists) {
            throw new ExceptionError('Loja não existe', 404, '');
        };

        const user = await repository.findUserById(user_id);

        if (user.id !== storeExists.userId) {
            throw new ExceptionError('Usuário inválido', 403, '');
        };


        const store = await repository.updateStore(data);

        return store;

    }

    async listByOwner(userId: string) {
        const userExists = await repository.findUserById(userId);

        if (!userExists) {
            throw new ExceptionError('Usuário inválido', 403, '');
        };

        const stores = await repository.findStoreByOwner(userId);

        if (stores.length === 0) {
            throw new ExceptionError('Não foi encontrado comércios relacionados ao usuário', 400, '');
        }

        return stores;

    }
};

export { StoreService };