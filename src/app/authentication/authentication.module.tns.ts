import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {routes} from '@src/app/authentication/authentication.common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginPageComponent } from '@src/app/authentication/components/login/login-page/login-page.component';
import {LoginFormComponent} from '@src/app/authentication/components/login/login-form/login-form.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    ReactiveFormsModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    NativeScriptRouterModule
  ]
})
export class AuthenticationModule { }
