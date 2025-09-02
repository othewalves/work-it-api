import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const authToken = req.headers.authorization;
    const token = req.cookies.workit_token;

    if (!token) {
        res.status(401).json({ error: "Token not found" });
        return;
    }

    try {
        const { sub } = verify(
            token,
            process.env.SECRETE_JWT,
        ) as IPayload;

        req.user_id = sub;

        next();
    } catch (error) {
        res.status(401).end();
    }


}