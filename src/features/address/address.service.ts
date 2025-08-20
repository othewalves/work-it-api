import { CreateAddressDTO } from "./schema/";
import * as repository from './address.repository';


class AddressService {
    async create(data: CreateAddressDTO) {
        const address = await repository.create(data);


    };
};

export { AddressService };