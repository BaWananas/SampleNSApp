import { Injectable } from '@angular/core';
import {IHttpErrorService} from '@src/app/shared/services/IHttpErrorService';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpError} from '@src/app/shared/models/HttpError/HttpError';
import {HttpSubError} from '@src/app/shared/models/HttpError/HttpSubError';
import {HttpValidationError} from '@src/app/shared/models/HttpError/HttpValidationError';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService implements IHttpErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse): HttpError {
    if (error.error.statusError) {
      const httpError: HttpError = HttpError.parseTo(error);
      httpError.subErrors = this.generateSubErrors(error.error);
      return httpError;
    } else {
      return new HttpError(
          error.status,
          error.statusText,
          new Date().toLocaleString(),
          error.message,
          error.name + '/' + error.message
      );
    }
  }

  private generateSubErrors(error: any): HttpSubError[] {
    if (error.subErrors && error.subErrors.length > 0) {
      if ((error.subErrors[0] as any).field) {
        return this.generateValidationError(error);
      }
    }

    return null;
  }

  private generateValidationError(error: HttpError): HttpValidationError[] {
    const errors: HttpValidationError[] = [];
    error.subErrors.forEach(value => {
      errors.push(HttpValidationError.parseTo(value));
    });
    return errors;
  }
}
