import {HttpSubError} from '@src/app/shared/models/HttpError/HttpSubError';
import {HttpErrorResponse} from '@angular/common/http';

export class HttpError {
    public status: number;
    public statusError: string;
    public timestamp: string;
    public message: string;
    public debugMessage: string;
    public subErrors: HttpSubError[];

    constructor(status: number,
                statusError: string,
                timestamp: string = null,
                message: string = null,
                debugMessage: string = null,
                subErrors: HttpSubError[] = null) {
        this.status = status;
        this.statusError = statusError;
        this.timestamp = timestamp;
        this.message = message;
        this.debugMessage = debugMessage;
        this.subErrors = subErrors;
    }

    public static parseTo(error: HttpErrorResponse): HttpError {
        return new HttpError(error.status,
            error.statusText,
            error.error.timestamp,
            error.error.message,
            error.error.debugMessage);
    }
}
