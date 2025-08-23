import { compare } from 'bcryptjs';

import { AuthUserDTO } from './auth.schema';
import { loginUser } from './auth.repository';

import { ExceptionError, generateToken } from '../../utils';

class AuthUserService {
    async login(data: AuthUserDTO) {

        const user = await loginUser(data);

        if (!user) {
            throw new ExceptionError(`E-mail e/ou senha inválidos`, 400, 'email');
        };

        const verifyPassword = await compare(data.password, user?.password)

        if (!verifyPassword) {
            throw new ExceptionError(`E-mail e/ou senha inválidos`, 400, 'password');
        }

        const token = generateToken(user);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                store: user.store
            },
            token: token
        }
    };
};

export { AuthUserService };