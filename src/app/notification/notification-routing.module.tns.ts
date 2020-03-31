import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import {NotificationCenterComponent} from '@src/app/notification/components/pages/notification-center/notification-center.component';

/**
 * Mobile specific routes
 */
const routes: Routes = [
  {path: '', component: NotificationCenterComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class NotificationRoutingModule { }
