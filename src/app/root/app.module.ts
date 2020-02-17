import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from '@src/app/root/app-routing.module';
import {AppComponent} from '@src/app/root/components/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@src/app/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HubComponent} from '@src/app/root/components/hub/hub.component';
import {AuthenticationModule} from '@src/app/authentication/authentication.module';
import { HomeComponent } from '@src/app/root/components/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HubComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // Custom modules
        SharedModule,
        AuthenticationModule,

        // Must be specified at the end.
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
