import { sign } from 'jsonwebtoken';

interface IPayloadToken {
    id: string;
    name: string;
    email: string;
    role: string;
}
export const generateToken = (payload: IPayloadToken) => {
    const token = sign(
        {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role
        },
        process.env.SECRETE_JWT,
        {
            subject: payload.id,
            expiresIn: '15d'
        },
    )
    return token;
}