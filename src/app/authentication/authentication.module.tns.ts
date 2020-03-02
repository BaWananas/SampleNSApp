import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {componentDeclarations, routes} from '@src/app/authentication/authentication.common';
import { LoginPageComponent } from '@src/app/authentication/components/login/login-page/login-page.component';
import {LoginFormComponent} from '@src/app/authentication/components/login/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule} from '@nativescript/angular';

@NgModule({
  declarations: [
      componentDeclarations
  ],
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
