import {Component, Input, OnInit} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular';
import {environment} from '@src/environments/environment';
import {GestureEventData} from '@nativescript/core';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {TitleNavBarCommon} from '@src/app/shared/components/navigation/title-nav-bar/title-nav-bar.common';

/**
 * Mobile implementation of {@link TitleNavBarCommon}
 */
@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.tns.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent extends TitleNavBarCommon implements OnInit {

  /**
   * Is the backward navigation was enabled ?
   */
  @Input() backEnabled: boolean;
  /**
   * URLs combination of home route.
   */
  @Input() homeUrls: string[];
  /**
   * @ignore
   */
  private animationService: IMobileAnimationService;

  /**
   * Constructor.
   * @param router Nativescript router
   * @param animationService Service managing animations.
   */
  constructor(private router: RouterExtensions, animationService: MobileAnimationService) {
    super();
    this.animationService = animationService;
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
  }

  /**
   * Navigate backward.
   */
  goBack(): void {
    this.router.back();
  }

  /**
   * Navigate to home.
   */
  goHome(): void {
    this.router.navigate(this.homeUrls, {clearHistory: true, transition: environment.defaultRoutingTransition});
  }

  /**
   * Animate the page buttons.
   * @param event
   */
  public animateButtons(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation, false);
  }

}
