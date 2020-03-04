import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';
import {Router} from '@angular/router';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';

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
   * @ignore
   */
  private authenticationService: IAuthenticationService;

  /**
   * @ignore
   */
  private feedbackService: IFeedbackService;

  /**
   * Constructor.
   * @param router Angular router
   * @param sessionService Refers to {@link ISessionService}
   * @param authenticationService Service managing user authentication operations. Refers to {@link IAuthenticationService}
   * @param feedbackService Refers to {@link IFeedbackService}
   */
  constructor(private router: Router,
              sessionService: SessionService,
              authenticationService: AuthenticationService,
              feedbackService: FeedbackService) {
    super(sessionService);
    this.authenticationService = authenticationService;
    this.feedbackService = feedbackService;
  }

  /**
   * Refers to {@link OnInit}.
   *
   * Verify if user was already authenticated, and redirect it if true.
   */
  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  /**
   * Refers to {@link LoginPageCommon}
   */
  onSubmit(succeeds: boolean): void {
    if (succeeds) {
      this.router.navigate(['home']);
    } else {
      this.feedbackService.notifyWarning('Incorrect email or password.');
    }
  }

}
