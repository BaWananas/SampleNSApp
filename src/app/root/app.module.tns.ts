import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {AppComponent} from '@src/app/root/components/app.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import {SubscriptionModule} from '@src/app/subscription/subscription.module';
import {AppRoutingModule} from '@src/app/root/app-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    SubscriptionModule,
    SharedModule,

    // Must be specified at the end.
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
