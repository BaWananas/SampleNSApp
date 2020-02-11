import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-title-nav-bar',
  templateUrl: './title-nav-bar.component.html',
  styleUrls: ['./title-nav-bar.component.css']
})
export class TitleNavBarComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() backUrl: string;
  @Input() homeUrl: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

  goHome(): void {
    this.router.navigate([this.homeUrl]);
  }

}
