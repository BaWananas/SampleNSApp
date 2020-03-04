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
      this.localUser = +user;
      this.logger.info(this, 'Local user found with ID: ' + this.localUser);
    } else {
      this.localUser = -1;
    }
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  public storeLocalUser(): void {
    if (!isNaN(this.localUser) && this.localUser >= 0) {
      localStorage.setItem('userId', '' + this.localUser);
    } else {
      this.localUser = -1;
      this.clearLocalUser();
    }
    this.logger.info(this, 'Store user to local storage with ID: ' + this.localUser);
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  public clearLocalUser(): void {
    localStorage.removeItem('userId');
    this.logger.info(this, 'Local user cleared.');
  }
}
