import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {routes} from '@src/app/root/app.common';

/**
 * Routing module for AppModule - Web version.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
