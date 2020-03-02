import { Injectable } from '@angular/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  private sessionService: ISessionService;

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  signIn(id: number): void {
    this.sessionService.user = id;
    this.sessionService.storeLocalUser();
  }

  signOut(): void {
    this.sessionService.user = -1;
    this.sessionService.clearLocalUser();
  }
}
