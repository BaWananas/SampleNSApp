import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';
import {environment} from '@src/environments/environment';
import {exit} from 'nativescript-exit';
import {RouterExtensions} from '@nativescript/angular';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import { SessionService } from '@src/app/shared/services/implementations/sessionService/session.service.tns';

/**
 * Implementation of {@link LoginPageCommon} for mobile platforms.
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.tns.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoginPageCommon implements OnInit {

  /**
   * @ignore
   */
  private feedbackService: IFeedbackService;

  /**
   * Constructor.
   * @param routerExtensions Nativescript router
   * @param sessionService Refers to {@link ISessionService}
   * @param feedbackService Refers to {@link IFeedbackService}
   */
  constructor(private routerExtensions: RouterExtensions,
              sessionService: SessionService,
              feedbackService: FeedbackService) {
    super(sessionService);
    this.feedbackService = feedbackService;
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
    if ((<SessionService>this.sessionService).sideDrawer) {
      (<SessionService>this.sessionService).sideDrawer.gesturesEnabled = false;
    }
  }

  /**
   * Terminate the App.
   *
   * Useless ? Maybe; Gadget ? For sure !
   */
  public exit(): void {
    exit();
  }

  /**
   * Refers to {@link LoginPageCommon}
   */
  public onSubmit(succeeds: boolean): void {
    if (succeeds) {
      this.routerExtensions.navigate(['home'], {clearHistory: true, transition: environment.defaultRoutingTransition});
      if ((<SessionService>this.sessionService).sideDrawer) {
        (<SessionService>this.sessionService).sideDrawer.gesturesEnabled = true;
      }
    } else {
      this.feedbackService.notifyWarning('Incorrect email or password.');
    }
  }

}
