import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '@src/app/root/app-routing.module';
import {AppComponent} from '@src/app/root/components/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@src/app/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from '@src/app/authentication/authentication.module';
import {componentDeclarations} from '@src/app/root/app.common';
import {MatRippleModule, MatSnackBar, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
    declarations: [
        componentDeclarations
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        FontAwesomeModule,
        MatRippleModule,
        MatSnackBarModule,
        ClipboardModule,

        // Custom modules
        SharedModule,
        AuthenticationModule,

        // Must be specified at the end.
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
