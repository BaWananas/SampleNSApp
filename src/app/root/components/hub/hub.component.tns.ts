import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '@src/environments/environment';
import {GestureEventData} from '@nativescript/core';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.tns.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  private animationService: IMobileAnimationService;
  @ViewChild('sideDrawer', {static: true}) sideDrawer: RadSideDrawerComponent;

  constructor(private routerExtensions: RouterExtensions, private animationSrv: MobileAnimationService) {
    this.animationService = animationSrv;
  }

  public toggleSideDrawer(): void {
    this.sideDrawer.sideDrawer.toggleDrawerState();
  }

  public navToHome(): void {
    this.routerExtensions.navigate(['hub'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  public navToSubscriptions(): void {
    this.routerExtensions.navigate(['./hub/subscription'], {clearHistory: true, transition: environment.defaultRoutingTransition});
    this.sideDrawer.sideDrawer.closeDrawer();
  }

  public logout(): void {
    // Do user session cleanup here
    this.routerExtensions.navigate([''], {clearHistory: true, transition: environment.defaultRoutingTransition});
  }

  ngOnInit() {
  }

  public animateButtons(event: GestureEventData): void {
    this.animationService.animate<TapAnimation>(event.view, TapAnimation);
  }

}
