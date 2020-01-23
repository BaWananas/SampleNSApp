import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() homeUrl: string;
  @Input() backEnabled: boolean;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.location.go(this.homeUrl);
  }

}
