import { Component, OnInit } from '@angular/core';
import {exit} from 'nativescript-exit';
import { RouterExtensions } from 'nativescript-angular/router';
import {environment} from '@src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
  }

  public exit(): void {
    exit();
  }

  public onSubmit(event: boolean): void {
    this.routerExtensions.navigate(['hub'], {clearHistory: true, transition: environment.defaultRoutingTransition});
  }

}
