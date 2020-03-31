import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from '@src/app/root/components/app/app.component';
import {AppRoutingModule} from '@src/app/root/app-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';
import {AuthenticationModule} from '@src/app/authentication/authentication.module';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';
import {NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular';
import {componentDeclarations} from '@src/app/root/app.common';
import {SentryModule} from 'nativescript-sentry/angular';

/**
 * Root module of the application - Mobile version.
 */
@NgModule({
    declarations: [
        componentDeclarations
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        SentryModule.forRoot({dsn: 'https://5cd21f6df44849fca78bb7178af2debe@sentry.io/3462100'}),

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
