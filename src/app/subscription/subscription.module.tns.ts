import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {SubscriptionRoutingModule} from '@src/app/subscription/subscription-routing.module';
import {componentDeclarations} from '@src/app/subscription/subscription.common';
import {SharedModule} from '@src/app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {ArhsUiModuleTns} from '@arhs/ui';

@NgModule({
    declarations: [
        componentDeclarations,
    ],
    exports: [
        componentDeclarations,
    ],
    imports: [
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
