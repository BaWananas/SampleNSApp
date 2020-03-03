import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {SubscriptionRoutingModule} from '@src/app/subscription/subscription-routing.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {SharedModule} from '@src/app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ArhsUiModuleTns} from '@arhs/ui';
import {NativeScriptCommonModule, NativeScriptFormsModule} from '@nativescript/angular';
import {CommonModule} from '@angular/common';

/**
 * Subscription module of the App.
 */
@NgModule({
    declarations: [
        componentDeclarations,
    ],
    exports: [
        componentDeclarations,
    ],
    imports: [
        CommonModule,
        NativeScriptCommonModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,

        // Custom modules
        SharedModule,
        ArhsUiModuleTns,

        // Routing
        SubscriptionRoutingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SubscriptionModule { }
