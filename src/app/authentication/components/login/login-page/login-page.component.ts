import {Component, OnInit} from '@angular/core';
import {LoginPageCommon} from '@src/app/authentication/components/login/login-page/login-page.common';
import {Router} from '@angular/router';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoginPageCommon implements OnInit {

  constructor(private router: Router,
              sessionService: SessionService) {
    super(sessionService);
  }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    this.router.navigate(['home']);
  }

  private isAuthenticated(): boolean {
    return (this.sessionService.user >= 0);
  }

}
