import {Injectable} from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {SessionsServiceCommon} from '@src/app/shared/services/implementations/sessionService/sessions.service.common';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

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
   * TODO
   * Refers to {@link SessionsServiceCommon}
   */
  loadLocalUser(): void {
    // TODO
  }

  /**
   * TODO
   * Refers to {@link SessionsServiceCommon}
   */
  storeLocalUser(): void {
    // TODO
  }

  /**
   * TODO
   * Refers to {@link SessionsServiceCommon}
   */
  clearLocalUser(): void {
    // TODO
  }
}
