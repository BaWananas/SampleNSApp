import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private authenticationService: IAuthenticationService;
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  public loginForm = this.form.group({
    id: ['', Validators.required],
    password: ['', Validators.required],
    userId: ['0', Validators.required]
  });

  constructor(private form: FormBuilder, authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
  }

  public submitForm(): void {
    this.authenticationService.signIn(this.loginForm.value.userId);
    this.submit.emit(true);
  }

}
