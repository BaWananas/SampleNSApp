import {Component, OnInit} from '@angular/core';
import {MobileAnimationService} from '@src/app/animation/services/implementations/mobile-animation.service';
import {GestureEventData, Page} from '@nativescript/core';
import {IMobileAnimationService} from '@src/app/animation/services/IMobileAnimationService';
import {TapAnimation} from '@src/app/animation/models/TapAnimations/TapAnimation';

@Component({
  selector: 'app-subscription-home',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent implements OnInit {

  private animationService: IMobileAnimationService;

  constructor(page: Page, animationService: MobileAnimationService) {
    page.actionBarHidden = true;
    this.animationService = animationService;
  }

  ngOnInit() {
  }

  public animateButton(event: GestureEventData): void {
    const btnAnimation = this.animationService.animate<TapAnimation>(event.view, TapAnimation);
  }

}
