export class ExceptionError extends Error {
    public readonly statusCode: number;
    public readonly field?: string | null;

    constructor(message: string, statusCode = 400, field?: string | null) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }
}
