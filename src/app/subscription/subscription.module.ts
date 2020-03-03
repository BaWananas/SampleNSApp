import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriptionRoutingModule} from '@src/app/subscription/subscription-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArhsUiModule} from '@arhs/ui';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

/**
 * Subscription module of the App.
 */
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
    FontAwesomeModule,

    // Custom modules
    SharedModule,
    ArhsUiModule,

    // Routing
    SubscriptionRoutingModule,
  ],
})
export class SubscriptionModule { }
