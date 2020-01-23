import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from '@src/app/root/app-routing.module';
import {AppComponent} from '@src/app/root/components/app.component';
import {SubscriptionModule} from '@src/app/subscription/subscription.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@src/app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SubscriptionModule,
    SharedModule,

    // Must be specified at the end.
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
