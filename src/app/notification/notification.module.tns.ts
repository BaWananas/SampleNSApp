import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {NotificationRoutingModule} from '@src/app/notification/notification-routing.module';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {componentDeclarations} from '@src/app/notification/notification.common';
import {NotificationCenterComponent} from '@src/app/notification/components/pages/notification-center/notification-center.component';
import {SharedModule} from '@src/app/shared/shared.module';

/**
 * Module related to notifications (currently mobile only).
 */
@NgModule({
    declarations: [
        componentDeclarations,
        NotificationCenterComponent
    ],
    imports: [
        NotificationRoutingModule,
        NativeScriptCommonModule,
        SharedModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    exports: [
        componentDeclarations
    ]
})
export class NotificationModule {
}
