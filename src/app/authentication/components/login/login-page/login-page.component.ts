import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';
import {Router} from '@angular/router';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Implementation of {@link LoginPageCommon} for web platform.
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoginPageCommon implements OnInit {

  /**
   * Constructor.
   * @param router Angular router
   * @param sessionService Refers to {@link ISessionService}
   */
  constructor(private router: Router,
              sessionService: SessionService) {
    super(sessionService);
  }

  /**
   * Refers to {@link OnInit}.
   *
   * Verify if user was already authenticated, and redirect it if true.
   */
  ngOnInit() {
    if (this.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  /**
   * Refers to {@link LoginPageCommon}
   */
  onSubmit(): void {
    this.router.navigate(['home']);
  }

  /**
   * Is the user was authenticated ?
   */
  private isAuthenticated(): boolean {
    return (this.sessionService.user >= 0);
  }

}
