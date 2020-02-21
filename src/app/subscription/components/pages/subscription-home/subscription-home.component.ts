import {Component, OnInit} from '@angular/core';
import {SubscriptionHomeCommon} from '@src/app/subscription/components/pages/subscription-home/subscription-home.common';

@Component({
  selector: 'app-subscription-home',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent extends SubscriptionHomeCommon implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
