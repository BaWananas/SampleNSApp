import {Injectable} from '@angular/core';
import {SessionsServiceCommon} from '@src/app/shared/services/implementations/sessionService/sessions.service.common';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends SessionsServiceCommon {

  constructor(logger: LoggerService) {
    super(logger);
  }

  public loadLocalUser(): void {
    const user = localStorage.getItem('userId');
    if (user && +user >= 0) {
      this.user = +user;
    } else {
      this.user = -1;
    }
  }

  public storeLocalUser(): void {
    if (this.user && this.user >= 0) {
      localStorage.setItem('userId', '' + this.user);
    } else {
      this.clearLocalUser();
    }
  }

  public clearLocalUser(): void {
    localStorage.removeItem('userId');
  }
}
