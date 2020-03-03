import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {componentDeclarations, routes} from '@src/app/authentication/authentication.common';
import {ReactiveFormsModule} from '@angular/forms';
import {NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule} from '@nativescript/angular';

/**
 * Authentication module of the App.
 */
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
