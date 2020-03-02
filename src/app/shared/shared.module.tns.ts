import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {componentDeclarations} from '@src/app/shared/shared.common';
import {ReactiveFormsModule} from '@angular/forms';
import {NativeScriptCommonModule, NativeScriptFormsModule} from '@nativescript/angular';


@NgModule({
  declarations: [
      componentDeclarations,
  ],
  imports: [
      NativeScriptCommonModule,
      NativeScriptFormsModule,
      ReactiveFormsModule,
  ],
  exports: [
      componentDeclarations,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
