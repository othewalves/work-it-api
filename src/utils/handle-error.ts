import { Response } from 'express';
import { ZodError } from 'zod';
import { ExceptionError } from './exception-error';

type FormattedError = {
    field: string | null;
    message: string;
};

export function handleError(error: unknown, res: Response): Response {
    if (error instanceof ZodError) {
        const formattedErrors: FormattedError[] = error.errors.map(err => ({
            field: String(err.path[0] || null),
            message: err.message
        }));

        return res.status(400).json({ errors: formattedErrors });
    }

    if (error instanceof ExceptionError) {
        return res.status(error.statusCode).json({
            errors: [
                {
                    field: error.field || null,
                    message: error.message
                }
            ]
        });
    }

    return res.status(500).json({
        errors: [
            {
                field: null,
                message: 'Erro interno do servidor'
            }
        ]
    });
}
