import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {RouterModule} from '@angular/router';
import {SubscriptionRoutingModule} from '@src/app/subscription/subscription-routing.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {TitleNavBarComponent} from '@src/app/shared/components/title-nav-bar/title-nav-bar.component';

@NgModule({
    declarations: [
        componentDeclarations,
    ],
  exports: [
      componentDeclarations,
  ],
    imports: [
        SubscriptionRoutingModule,
        NativeScriptCommonModule,
        RouterModule,
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SubscriptionModule { }
