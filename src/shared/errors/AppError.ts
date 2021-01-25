class AppError {
    // Readonly impede que se use o AAppError desse jeito: AppError.message
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;
