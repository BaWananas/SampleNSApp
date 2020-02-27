import { Injectable } from '@angular/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  private userId = -1;

  constructor() { }

  getAuthenticatedUserId(): number {
    return this.userId;
  }

  signIn(id: number): void {
    this.userId = id;
  }

  signOut(): void {
    this.userId = -1;
  }
}
