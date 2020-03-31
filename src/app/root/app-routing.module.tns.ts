import { NgModule } from '@angular/core';
import {routes} from '@src/app/root/app.common';
import { NativeScriptRouterModule } from '@nativescript/angular';
import {Routes} from '@angular/router';

/**
 * Specific routes for mobile platform + common routes.
 */
const mobileRoutes: Routes = routes;
routes.unshift(
    {path: 'notification', loadChildren: () => import('../notification/notification.module.tns').then((m) => m.NotificationModule)}
);
/**
 * Routing module for AppModule - Mobile version.
 */
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(mobileRoutes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
