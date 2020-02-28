import { Injectable } from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {SessionsServiceCommon} from '@src/app/shared/services/implementations/sessionService/sessions.service.common';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends SessionsServiceCommon {

  public sideDrawer: RadSideDrawerComponent;

  constructor(authenticationService: AuthenticationService,
              logger: LoggerService) {
    super(logger);
  }

  loadLocalUser(): void {
  }

  storeLocalUser(): void {
  }

  clearLocalUser(): void {
  }
}
