import {Component, Input, OnInit} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular';
import {environment} from '@src/environments/environment';
import {GestureEventData} from '@nativescript/core';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {TitleNavBarCommon} from '@src/app/shared/components/navigation/title-nav-bar/title-nav-bar.common';

@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.tns.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent extends TitleNavBarCommon implements OnInit {

  @Input() backEnabled: boolean;
  @Input() homeUrls: string[];
  private animationService: IMobileAnimationService;

  constructor(private router: RouterExtensions, animationService: MobileAnimationService) {
    super();
    this.animationService = animationService;
  }

  ngOnInit() {
  }

  goBack(): void {
    this.router.back();
  }

  goHome(): void {
    this.router.navigate(this.homeUrls, {clearHistory: true, transition: environment.defaultRoutingTransition});
  }

  public animateButtons(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation, false);
  }

}
