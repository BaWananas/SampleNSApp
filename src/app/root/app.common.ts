import {Routes} from '@angular/router';
import {NotFoundComponent} from '@src/app/shared/components/http/not-found/not-found.component';
import {HomeComponent} from '@src/app/root/components/home/home.component';
import {AppComponent} from '@src/app/root/components/app/app.component';

export const componentDeclarations: any[] = [
    AppComponent,
    HomeComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'subscription', loadChildren: () => import('../subscription/subscription.module').then((m) => m.SubscriptionModule)},
    {path: '**', component: NotFoundComponent},
];
