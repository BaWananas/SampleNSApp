import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
      componentDeclarations,
  ],
  imports: [
      NativeScriptCommonModule,
      ReactiveFormsModule,
  ],
  exports: [
      componentDeclarations,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
