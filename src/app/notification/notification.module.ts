import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationRoutingModule} from '@src/app/notification/notification-routing.module';
import {componentDeclarations} from '@src/app/notification/notification.common';

/**
 * Module related to notifications (currently mobile only).
 */
@NgModule({
    declarations: [
        componentDeclarations
    ],
    imports: [
        CommonModule,
        NotificationRoutingModule
    ],
    exports: [
        componentDeclarations
    ]
})
export class NotificationModule {
}
