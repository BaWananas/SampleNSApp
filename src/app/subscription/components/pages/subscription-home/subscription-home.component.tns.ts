import {Component, OnInit} from '@angular/core';
import {GestureEventData, Page} from '@nativescript/core';
import {environment} from '@src/environments/environment';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {RouterExtensions} from '@nativescript/angular';
import {SubscriptionHomeCommon} from '@src/app/subscription/components/pages/subscription-home/subscription-home.common';

@Component({
  selector: 'app-subscription-home',
  templateUrl: './subscription-home.component.tns.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent extends SubscriptionHomeCommon implements OnInit {

  private animationService: IMobileAnimationService;

  constructor(page: Page, animationService: MobileAnimationService, private routerExtensions: RouterExtensions) {
    super();
    page.actionBarHidden = true;
    this.animationService = animationService;
  }

  ngOnInit() {
  }

  public animateButton(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation);
  }

  public navToSubscribing(): void {
    this.routerExtensions.navigate(['hub/subscription/subscribing'], {clearHistory: false, transition: environment.defaultRoutingTransition});
  }

  public navToSettings(): void {
    this.routerExtensions.navigate(['hub/subscription/settings'], {clearHistory: false, transition: environment.defaultRoutingTransition});
  }

}
