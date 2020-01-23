import { Routes } from '@angular/router';
import {NotFoundComponent} from '@src/app/shared/components/not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'groups', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent},
];
