import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '@arhs/core';
import {GestureEventData, isAndroid, Page} from '@nativescript/core';
import * as statusBar from 'nativescript-status-bar';
import {ApplicationEventData, on} from 'tns-core-modules/application';
import {RouterExtensions} from '@nativescript/angular';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {environment} from '@src/environments/environment';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {AppCommon} from '@src/app/root/components/app/app.common';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Root component. Entrance of the App.
 *
 * Extends {@link AppCommon}.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent extends AppCommon implements OnInit {

  /**
   * Constructor.
   * @param page Related page of the component.
   * @param httpService Service used to Http CRUD operations.
   * @param routerExtensions Nativescript router.
   * @param sessionService Service related to user authentication.
   * @param animationSrv Manage all the animations.
   * @param authenticationService Service used for sessions and data persistence.
   */
  constructor(page: Page,
              private httpService: HttpService,
              private routerExtensions: RouterExtensions,
              sessionService: SessionService,
              animationSrv: MobileAnimationService,
              authenticationService: AuthenticationService) {
    super(authenticationService, sessionService);
    this.animationService = animationSrv;
    httpService.rootUrl = 'http://10.66.0.21:9700/';

    AppComponent.hideAndroidStatusBar();
    on('resume', (args: ApplicationEventData) => {
      if (args.android) {
        AppComponent.hideAndroidStatusBar();
      }
    }, this);
  }

  /**
   * @ignore
   */
  private animationService: IMobileAnimationService;

  /**
   * Side drawer menu.
   */
  @ViewChild('sideDrawer', {static: true}) sideDrawer: RadSideDrawerComponent;

  /**
   * Hide android status Bar.
   */
  private static hideAndroidStatusBar(): void {
    if (isAndroid) {
      statusBar.hide();
    }
  }

  /**
   * Refers to {@link OnInit}.
   */
  ngOnInit(): void {
    super.ngOnInit();
    (<SessionService>this.sessionService).sideDrawer = this.sideDrawer;
  }

  /**
   * Refers to {@link AppCommon}
   */
  public logout(): void {
    // Do user session cleanup here
    this.authenticationService.signOut();
    this.routerExtensions.navigate([''], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  /**
   * Naviagte to home page.
   */
  public navToHome(): void {
    this.routerExtensions.navigate(['home'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  /**
   * Navigate to subscription page.
   */
  public navToSubscriptions(): void {
    this.routerExtensions.navigate(['subscription'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  /**
   * Animate the page buttons.
   * @param event
   */
  public animateButtons(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation);
  }
}
