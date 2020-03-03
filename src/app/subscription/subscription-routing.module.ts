import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from '@src/app/subscription/subscription.common';

/**
 * Routing module for subscription module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
