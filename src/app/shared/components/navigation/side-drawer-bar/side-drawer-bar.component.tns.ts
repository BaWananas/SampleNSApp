import {Component, OnInit} from '@angular/core';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
  selector: 'app-side-drawer-bar',
  templateUrl: './side-drawer-bar.component.tns.html',
  styleUrls: ['./side-drawer-bar.component.css']
})
export class SideDrawerBarComponent implements OnInit {

  private sideDrawer: RadSideDrawerComponent;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sideDrawer = this.sessionService.sideDrawer;
  }

  public toggleSideDrawer(): void {
    if (this.sideDrawer) {
      this.sideDrawer.sideDrawer.toggleDrawerState();
    }
  }

}
