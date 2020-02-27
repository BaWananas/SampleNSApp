import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TitleNavBarCommon} from '@src/app/shared/components/navigation/title-nav-bar/title-nav-bar.common';

@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent extends TitleNavBarCommon implements OnInit {

  @Input() backUrl: string;
  @Input() homeUrl: string;

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

  goHome(): void {
    this.router.navigate([this.homeUrl]);
  }

}
