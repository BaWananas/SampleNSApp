import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';
import {environment} from '@src/environments/environment';
import {exit} from 'nativescript-exit';
import {RouterExtensions} from '@nativescript/angular';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

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
   * Constructor.
   * @param routerExtensions Nativescript router
   * @param sessionService Refers to {@link ISessionService}
   */
  constructor(private routerExtensions: RouterExtensions, sessionService: SessionService) {
    super(sessionService);
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
    (<SessionService>this.sessionService).sideDrawer.gesturesEnabled = false;
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
  public onSubmit(): void {
    this.routerExtensions.navigate(['home'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    (<SessionService>this.sessionService).sideDrawer.gesturesEnabled = true;
  }

}
