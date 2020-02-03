import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {SubscriptionRoutingModule} from '@src/app/subscription/subscription-routing.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {SharedModule} from '@src/app/shared/shared.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import {ArhsUi} from 'arhs-ui';

@NgModule({
    declarations: [
        componentDeclarations,
    ],
  exports: [
      componentDeclarations,
  ],
    imports: [
        NativeScriptCommonModule,
        RouterModule,
        SharedModule,
        SubscriptionRoutingModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        ArhsUi,
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SubscriptionModule { }
