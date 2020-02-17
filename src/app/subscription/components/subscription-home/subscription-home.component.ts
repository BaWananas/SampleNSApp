import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

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
