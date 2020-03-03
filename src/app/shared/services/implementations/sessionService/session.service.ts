import {Injectable} from '@angular/core';
import {SessionsServiceCommon} from '@src/app/shared/services/implementations/sessionService/sessions.service.common';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

/**
 * Implementation of {@link ISessionService}.
 *
 * Web implementation of SessionService.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService extends SessionsServiceCommon {

  /**
   * Constructor.
   * Refers to {@link SessionsServiceCommon}
   * @param logger
   */
  constructor(logger: LoggerService) {
    super(logger);
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  public loadLocalUser(): void {
    const user = localStorage.getItem('userId');
    if (user && +user >= 0) {
      this.user = +user;
    } else {
      this.user = -1;
    }
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  public storeLocalUser(): void {
    if (this.user && this.user >= 0) {
      localStorage.setItem('userId', '' + this.user);
    } else {
      this.clearLocalUser();
    }
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  public clearLocalUser(): void {
    localStorage.removeItem('userId');
  }
}
