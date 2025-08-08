import { CreateUserDTO, UpdateUserDTO } from "./schema";

import * as repository from "./user.repository";

import { ExceptionError, validityCPF } from "../../utils";

class UserService {

    async create(data: CreateUserDTO) {

        const isValidCPF = validityCPF(data.cpf);

        if (!isValidCPF) {
            throw new ExceptionError("CPF inválido", 409, 'cpf');
        }

        const userExists = await repository.findByEmail(data.email);

        if (userExists) {
            throw new ExceptionError("E-mail já cadastrado", 409, 'email');
        };

        const cpfExists = await repository.findByCPF(data.cpf);

        if (cpfExists) {
            throw new ExceptionError("CPF já cadastrado", 409, 'email');
        }

        const newUser = await repository.createUser(data);

        return newUser;
    }

    async getUser(id: string) {
        const user = await repository.findById(id);

        if (!user) {
            throw new ExceptionError("Usuário não encontrado", 404, 'email');
        }

        return user;
    }

    async update(id: string, data: UpdateUserDTO) {
        const userExists = repository.findById(id);

        if (!userExists) {
            throw new ExceptionError('Operação não autorizada', 401, 'id');
        }

        const user = await repository.updateUser(id, data);
        return user;
    }

}
export { UserService }; 