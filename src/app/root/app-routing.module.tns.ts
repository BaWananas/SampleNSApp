import { NgModule } from '@angular/core';
import {routes} from '@src/app/root/app.common';
import { NativeScriptRouterModule } from '@nativescript/angular';

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
