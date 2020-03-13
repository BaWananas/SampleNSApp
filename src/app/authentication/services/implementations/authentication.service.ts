import { Injectable } from '@angular/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

/**
 * Implementation of {@link IAuthenticationService}.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  /**
   * @ignore
   */
  private sessionService: ISessionService;

  /**
   * @ignore
   */
  private logger: ILoggerService;

  /**
   * Current authenticated user.
   */
  private authenticatedUser = -1;

  /**
   * Constructor.
   * @param sessionService Refers to {@link ISessionService}
   * @param logger Refers to {@link ILoggerService}
   */
  constructor(sessionService: SessionService,
              logger: LoggerService) {
    this.sessionService = sessionService;
    this.logger = logger;
  }

  /**
   * Refers to {@link IAuthenticationService}
   * @param id
   */
  signIn(id: number): boolean {
    if (isNaN(id) || id < 0) {
      return false;
    }

    this.authenticatedUser = id;
    this.sessionService.localUser = id;
    this.sessionService.storeLocalUser();
    return true;
  }

  /**
   * Refers to {@link IAuthenticationService}
   */
  signOut(): void {
    this.authenticatedUser = -1;
    this.sessionService.localUser = -1;
    this.sessionService.clearLocalUser();
  }

  isAuthenticated(): boolean {
    return (this.authenticatedUser >= 0);
  }
}
