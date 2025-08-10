import { ExceptionError } from "../../utils";
import { CreateStoreDTO } from "./schema";
import * as repository from './store.repository';

class StoreService {
    async create(user_id: string, data: CreateStoreDTO) {
        const storeAlreadyExists = await repository.findStoreByCNPJ(data.cnpj);

        if (storeAlreadyExists) {
            throw new ExceptionError('CNPJ já existente', 401, '');
        };

        const store = await repository.createStore(user_id, data);

        if (store) {
            await repository.updateUserToMerchant(user_id);
        }

        return store;
    };
};

export { StoreService };