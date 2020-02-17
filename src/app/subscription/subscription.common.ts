import { Routes } from '@angular/router';
import {GroupListComponent} from '@src/app/subscription/components/group-list/group-list.component';
import {GroupCreationFormComponent} from '@src/app/subscription/components/forms/group-creation-form/group-creation-form.component';
import {SubscriptionHomeComponent} from '@src/app/subscription/components/subscription-home/subscription-home.component';
import {SubscriptionListComponent} from '@src/app/subscription/components/lists/subscription-list/subscription-list.component';
import {UserSubscriptionsListComponent} from '@src/app/subscription/components/lists/user-subscriptions-list/user-subscriptions-list.component';
import {SuscbribingFormComponent} from '@src/app/subscription/components/forms/suscbribing-form/suscbribing-form.component';

export const componentDeclarations: any[] = [
    SubscriptionListComponent,
    GroupListComponent,
    GroupCreationFormComponent,
    SubscriptionHomeComponent,
    UserSubscriptionsListComponent,
    SuscbribingFormComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {path: '', component: SubscriptionHomeComponent},
    {path: 'groups/:id/subscriptions', component: SubscriptionListComponent},
];
