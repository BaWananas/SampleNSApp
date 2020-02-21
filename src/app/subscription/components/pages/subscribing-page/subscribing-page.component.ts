import { Component, OnInit } from '@angular/core';
import {SubscribingPageCommon} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.common';

@Component({
  selector: 'app-subscribing-page',
  templateUrl: './subscribing-page.component.html',
  styleUrls: ['./subscribing-page.component.css']
})
export class SubscribingPageComponent extends SubscribingPageCommon implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
