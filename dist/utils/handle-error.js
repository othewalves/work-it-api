"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const zod_1 = require("zod");
const exception_error_1 = require("./exception-error");
function handleError(error, res) {
    if (error instanceof zod_1.ZodError) {
        const formattedErrors = error.errors.map(err => ({
            field: String(err.path[0] || null),
            message: err.message
        }));
        return res.status(400).json({ errors: formattedErrors });
    }
    if (error instanceof exception_error_1.ExceptionError) {
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
