export class EcomError extends Error {
    constructor(code: string, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }
    code: string;
    message: string;
}



