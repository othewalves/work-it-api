"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionError = void 0;
class ExceptionError extends Error {
    constructor(message, statusCode = 400, field) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }
}
exports.ExceptionError = ExceptionError;
