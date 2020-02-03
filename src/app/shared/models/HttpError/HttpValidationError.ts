import {HttpSubError} from '@src/app/shared/models/HttpError/HttpSubError';

export class HttpValidationError extends HttpSubError {
    public object: string;
    public field: string;
    public rejectedValue: any;
    public message: string;


    constructor(object: string, field: string, rejectedValue: any, message: string) {
        super();
        this.object = object;
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.message = message;
    }

    public static parseTo(object: any): HttpValidationError {
        return new HttpValidationError(object.object,
            object.field,
            object.rejectedValue,
            object.message);
    }

    formatError(): string {
        return 'Field <' + this.field + '> reject value <' + this.rejectedValue + '> for the reason: \"' + this.message + '\".';
    }

}
