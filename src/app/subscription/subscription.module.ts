import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriptionRoutingModule} from './subscription-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {RouterModule} from '@angular/router';
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
    RouterModule,
    SharedModule,
    SubscriptionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ArhsUiModule
  ],
})
export class SubscriptionModule { }
