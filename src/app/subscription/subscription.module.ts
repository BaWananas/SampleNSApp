import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubscriptionRoutingModule} from './subscription-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';


@NgModule({
  declarations: [
      componentDeclarations,
  ],
  exports: [
      componentDeclarations,
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SharedModule,
  ],
})
export class SubscriptionModule { }
