import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
  styleUrls: [
      './app.component.css',
  ]
})
export class AppComponent extends AppCommon implements OnInit {

  private animationService: IMobileAnimationService;

  @ViewChild('sideDrawer', {static: true}) sideDrawer: RadSideDrawerComponent;

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

  private static hideAndroidStatusBar(): void {
    if (isAndroid) {
      statusBar.hide();
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    // @ts-ignore Because IntelliJ was kinda stupid "sometimes".
    this.sessionService.sideDrawer = this.sideDrawer;
  }

  public navToHome(): void {
    this.routerExtensions.navigate(['home'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  public navToSubscriptions(): void {
    this.routerExtensions.navigate(['subscription'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  public logout(): void {
    // Do user session cleanup here
    this.authenticationService.signOut();
    this.routerExtensions.navigate([''], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  public animateButtons(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation);
  }
}
