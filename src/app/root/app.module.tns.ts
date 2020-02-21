import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from '@src/app/root/components/app/app.component';
import {AppRoutingModule} from '@src/app/root/app-routing.module';
import {SharedModule} from '@src/app/shared/shared.module';
import {AuthenticationModule} from '@src/app/authentication/authentication.module';
import {HubComponent} from '@src/app/root/components/hub/hub.component';
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';
import {HomeComponent} from '@src/app/root/components/home/home.component';
import {NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule} from '@nativescript/angular';

@NgModule({
    declarations: [
        AppComponent,
        HubComponent,
        HomeComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,

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
