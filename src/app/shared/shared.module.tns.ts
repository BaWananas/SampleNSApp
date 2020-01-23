import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import { HttpWaitingComponent } from '@src/app/shared/components/http-waiting/http-waiting.component';
import { NotFoundComponent } from '@src/app/shared/components/not-found/not-found.component';



@NgModule({
  declarations: [
      componentDeclarations,
  ],
  imports: [
      NativeScriptCommonModule
  ],
  exports: [
      componentDeclarations,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
