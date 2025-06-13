export class HttpError extends Error {
    public status: number;
    public message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

}

export class NotFoundError extends HttpError {
    constructor(message: string = "Not found") {
        super(404, message);
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = "Bad request") {
        super(400, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = "Forbidden") {
        super(403, message);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = "Internal server error") {
        super(500, message);
    }
}
