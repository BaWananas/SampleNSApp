import {Component, Input, OnInit} from '@angular/core';
import {TitleNavBarCommon} from '@src/app/shared/components/title-nav-bar/title-nav-bar.common';
import {RouterExtensions} from '@nativescript/angular';
import {environment} from '@src/environments/environment';

@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.tns.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent extends TitleNavBarCommon implements OnInit {

  @Input() backEnabled: boolean;
  @Input() homeUrls: string[];

  constructor(private router: RouterExtensions) {
    super();
  }

  ngOnInit() {
  }

  goBack(): void {
    this.router.back();
  }

  goHome(): void {
    this.router.navigate(this.homeUrls, {clearHistory: true, transition: environment.defaultRoutingTransition});
  }

}
