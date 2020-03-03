import {NgModule} from '@angular/core';
import {routes} from '@src/app/subscription/subscription.common';
import {NativeScriptRouterModule} from '@nativescript/angular';

/**
 * Routing module for subscription module.
 */
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SubscriptionRoutingModule { }
