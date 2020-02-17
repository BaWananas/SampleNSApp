import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {environment} from '@src/environments/environment';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

  @ViewChild('sideDrawer', {static: true}) sideDrawer: RadSideDrawerComponent;

  constructor(private routerExtensions: RouterExtensions) {}

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

}
