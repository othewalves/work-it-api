import * as schema from "./schema";

import * as repository from "./user.repository";

import { ExceptionError, validityCPF } from "../../utils";
import { compare, hash } from "bcryptjs";

class UserService {

    async create(data: schema.CreateUserDTO) {

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

    async update(id: string, data: schema.UpdateUserDTO) {
        const userExists = repository.findById(id);

        if (!userExists) {
            throw new ExceptionError('Operação não autorizada', 401, 'id');
        }

        const user = await repository.updateUser(id, data);
        console.log('caiu aqui', user);

        return user;
    }

    async forgotPassword(id: string, data: schema.ForgotPasswordDTO) {
        const userExists = await repository.findById(id);

        if (!userExists) {
            throw new ExceptionError('Usuário inválido', 401, '')
        }

        const oldPassword = await repository.getPassword(id);

        const verifyOldPassword = await compare(data.oldPassword, oldPassword.password);


        if (!verifyOldPassword) {
            console.log(verifyOldPassword)
            throw new ExceptionError('Senha antiga não corresponde', 404, '');
        }

        if (data.password !== data.confirmPassword) {
            throw new ExceptionError('Senhas não correspondem', 404, '');
        }
        const passwordEncrypted = await hash(data.password, 8);


        const payload = await repository.forgotPassword(passwordEncrypted, id);

        return {
            payload, message: "Senha alterada com sucesso!"
        }
    }

}
export { UserService }; 