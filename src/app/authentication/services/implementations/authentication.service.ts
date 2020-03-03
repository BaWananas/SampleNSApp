import { Injectable } from '@angular/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

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
   * Constructor.
   * @param sessionService Refers to {@link ISessionService}
   */
  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  /**
   * Refers to {@link ISessionService}
   * @param id
   */
  signIn(id: number): boolean {
    this.sessionService.user = id;
    this.sessionService.storeLocalUser();
    return true;
  }

  /**
   * Refers to {@link ISessionService}
   */
  signOut(): void {
    this.sessionService.user = -1;
    this.sessionService.clearLocalUser();
  }
}
