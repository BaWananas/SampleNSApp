import {Injectable} from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {SessionsServiceCommon} from '@src/app/shared/services/implementations/sessionService/sessions.service.common';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import { remove, setNumber, getNumber } from '@nativescript/core/application-settings/application-settings';

/**
 * Implementation of {@link ISessionService}.
 *
 * Mobile implementation of SessionService.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService extends SessionsServiceCommon {

  /**
   * Side drawer of mobile App.
   */
  public sideDrawer: RadSideDrawerComponent;

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
  loadLocalUser(): void {
    const user = getNumber('userId', -1);
    if (!isNaN(user) && +user >= 0) {
      this.localUser = +user;
      this.logger.info(this, 'Local user found with ID: ' + this.localUser);
    } else {
      this.localUser = -1;
    }
  }

  /**
   * Refers to {@link SessionsServiceCommon}
   */
  storeLocalUser(): void {
    if (!isNaN(this.localUser) && this.localUser >= 0) {
      setNumber('userId', this.localUser);
    } else {
      this.localUser = -1;
      this.clearLocalUser();
    }
    this.logger.info(this, 'Store user to local storage with ID: ' + this.localUser);
  }

  /**s
   * Refers to {@link SessionsServiceCommon}
   */
  clearLocalUser(): void {
    remove('userId');
    this.logger.info(this, 'Local user cleared.');
  }
}
