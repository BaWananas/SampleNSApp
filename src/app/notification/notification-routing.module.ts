import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Web specific routes (unused).
 */
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
