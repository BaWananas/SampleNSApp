import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriptionRoutingModule} from '@src/app/subscription/subscription-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArhsUiModule} from '@arhs/ui';

@NgModule({
  declarations: [
      componentDeclarations,
  ],
  exports: [
      componentDeclarations,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // Custom modules
    SharedModule,
    ArhsUiModule,

    // Routing
    SubscriptionRoutingModule,
  ],
})
export class SubscriptionModule { }
