import {HttpErrorResponse} from '@angular/common/http';
import {HttpError} from '@src/app/shared/models/HttpError/HttpError';

export interface IHttpErrorService {
    handleError(error: HttpErrorResponse): HttpError;
}
