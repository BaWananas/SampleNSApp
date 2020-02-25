import {Component, OnInit} from '@angular/core';
import {GestureEventData, Page} from '@nativescript/core';
import {SubscribingPageCommon} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';

@Component({
  selector: 'app-subscribing-page',
  templateUrl: './subscribing-page.component.tns.html',
  styleUrls: ['./subscribing-page.component.css']
})
export class SubscribingPageComponent extends SubscribingPageCommon implements OnInit {

  private animationService: IMobileAnimationService;

  constructor(page: Page,
              subscriptionService: SubscriptionService,
              authenticationService: AuthenticationService,
              errorService: HttpErrorService,
              loggerService: LoggerService,
              animationService: MobileAnimationService) {
    super(subscriptionService, authenticationService, errorService, loggerService);
    page.actionBarHidden = true;
    this.animationService = animationService;
  }

  ngOnInit() {
  }

  protected postSubscribe(succeeds: boolean, groupId: number, error?: HttpError): void {
    if (succeeds && !error) {
      this.subscribingEvent.emit(groupId);
    }
  }

  public animateButtons(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation, false);
  }

}
