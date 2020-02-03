import { Routes } from '@angular/router';
import {SubscriptionListComponent} from '@src/app/subscription/components/subscription-list/subscription-list.component';
import {GroupListComponent} from '@src/app/subscription/components/group-list/group-list.component';
import {GroupSubscriptionLogsComponent} from '@src/app/subscription/components/group-subscription-logs/group-subscription-logs.component';
import {GroupCreationFormComponent} from '@src/app/subscription/components/forms/group-creation-form/group-creation-form.component';

export const componentDeclarations: any[] = [
    SubscriptionListComponent,
    GroupSubscriptionLogsComponent,
    GroupListComponent,
    GroupCreationFormComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {path: 'groups', component: GroupListComponent},
    {path: 'groups/:id/subscriptions', component: SubscriptionListComponent},
];
