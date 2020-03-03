import { NgModule } from '@angular/core';
import {routes} from '@src/app/root/app.common';
import { NativeScriptRouterModule } from '@nativescript/angular';

/**
 * Routing module for AppModule - Mobile version.
 */
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
