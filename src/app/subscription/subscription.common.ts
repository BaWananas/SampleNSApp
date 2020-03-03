import {GroupListComponent} from '@src/app/subscription/components/lists/group-list/group-list.component';
import {GroupCreationFormComponent} from '@src/app/subscription/components/forms/group-creation-form/group-creation-form.component';
import {UserSubscriptionsListComponent} from '@src/app/subscription/components/lists/user-subscriptions-list/user-subscriptions-list.component';
import {SubscriptionHomeComponent} from '@src/app/subscription/components/pages/subscription-home/subscription-home.component';
import {SubscribingPageComponent} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.component';
import {Routes} from '@angular/router';
import {SubscriptionSettingPageComponent} from '@src/app/subscription/components/pages/subscription-setting-page/subscription-setting-page.component';

/**
 * Shared components.
 */
export const componentDeclarations: any[] = [
    GroupListComponent,
    GroupCreationFormComponent,
    SubscriptionHomeComponent,
    UserSubscriptionsListComponent,
    SubscribingPageComponent,
    SubscriptionSettingPageComponent,
];

/**
 * Shared providers.
 */
export const providerDeclarations: any[] = [
];

/**
 * Shared routes.
 */
export const routes: Routes = [
    {path: '', component: SubscriptionHomeComponent},
    {path: 'subscribing', component: SubscribingPageComponent},
    {path: 'settings', component: SubscriptionSettingPageComponent}
];
