import { Component, OnInit } from '@angular/core';
import {Page} from '@nativescript/core';
import {SubscribingPageCommon} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.common';

@Component({
  selector: 'app-subscribing-page',
  templateUrl: './subscribing-page.component.tns.html',
  styleUrls: ['./subscribing-page.component.css']
})
export class SubscribingPageComponent extends SubscribingPageCommon implements OnInit {

  constructor(page: Page) {
    super();
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

}
