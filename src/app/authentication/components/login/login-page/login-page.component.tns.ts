import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';
import {environment} from '@src/environments/environment';
import {exit} from 'nativescript-exit';
import {RouterExtensions} from '@nativescript/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.tns.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoginPageCommon implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {
    super();
  }

  ngOnInit() {
  }

  public exit(): void {
    exit();
  }

  public onSubmit(): void {
    this.routerExtensions.navigate(['login'], {clearHistory: true, transition: environment.defaultRoutingTransition});
  }

}
