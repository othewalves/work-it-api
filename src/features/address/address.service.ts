import { CreateAddressDTO } from "./schema/";
import * as repository from './address.repository';
import { ExceptionError } from "../../utils";


class AddressService {
    async create(data: CreateAddressDTO) {

        const storeExists = await repository.findStore(data.storeId);

        if (!storeExists) {
            throw new ExceptionError('Comércio inválido', 400, '');
        };

        const address = await repository.create(data);

        return address
    };
};

export { AddressService };