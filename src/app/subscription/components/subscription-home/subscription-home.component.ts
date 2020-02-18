import {Component, OnInit} from '@angular/core';
import {Page} from 'tns-core-modules/ui/page/page';
import {GestureEventData} from '@nativescript/core/ui/gestures/gestures';
import {AnimationCurve} from '@nativescript/core/ui/enums';
import {View} from '@nativescript/core';

@Component({
  selector: 'app-subscription-home',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent implements OnInit {

  constructor(page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

}
