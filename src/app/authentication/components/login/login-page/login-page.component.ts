import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoginPageCommon implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onSubmit(): void {
  }

}
