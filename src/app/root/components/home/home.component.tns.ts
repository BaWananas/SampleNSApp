import { Component, OnInit } from '@angular/core';
import {Page} from '@nativescript/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.tns.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

}
