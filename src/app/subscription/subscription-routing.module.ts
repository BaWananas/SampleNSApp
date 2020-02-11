import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from '@src/app/subscription/subscription.common';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
