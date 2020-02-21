import { Component, OnInit } from '@angular/core';
import {SubscriptionSettingPageCommon} from '@src/app/subscription/components/pages/subscription-setting-page/subscription-setting-page.common';

@Component({
  selector: 'app-subscription-setting-page',
  templateUrl: './subscription-setting-page.component.html',
  styleUrls: ['./subscription-setting-page.component.css']
})
export class SubscriptionSettingPageComponent extends SubscriptionSettingPageCommon  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
