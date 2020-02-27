import {Routes} from '@angular/router';
import {NotFoundComponent} from '@src/app/shared/components/not-found/not-found.component';
import {HomeComponent} from '@src/app/root/components/home/home.component';

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'subscription', loadChildren: () => import('../subscription/subscription.module').then((m) => m.SubscriptionModule)},
    {path: '**', component: NotFoundComponent},
];
