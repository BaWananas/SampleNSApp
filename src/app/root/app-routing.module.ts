import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {routes} from '@src/app/root/app.common';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
