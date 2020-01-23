import { Routes } from '@angular/router';
import {SubscriptionListComponent} from '@src/app/subscription/components/subscription-list/subscription-list.component';
import {GroupListComponent} from '@src/app/subscription/components/group-list/group-list.component';
import {SubscriptionDetailsComponent} from '@src/app/subscription/components/subscription-details/subscription-details.component';
import {GroupSubscriptionLogsComponent} from '@src/app/subscription/components/group-subscription-logs/group-subscription-logs.component';

export const componentDeclarations: any[] = [
    SubscriptionListComponent,
    SubscriptionDetailsComponent,
    GroupSubscriptionLogsComponent,
    GroupListComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {path: 'groups', component: GroupListComponent},
    {path: 'groups/:id/subscriptions', component: SubscriptionListComponent},
    {path: 'subscriptions/:id', component: SubscriptionDetailsComponent},
];
