import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login-form',
  templateUrl: './login-form.component.tns.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() formSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticationService: IAuthenticationService;
  public loginForm = this.form.group({
    id: [''],
    password: [''],
    userId: ['0', Validators.required]
  });

  constructor(private form: FormBuilder, authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
  }

  public submitForm(): void {
    this.authenticationService.signIn(this.loginForm.value.userId);
    this.formSubmit.emit(true);
  }

}
