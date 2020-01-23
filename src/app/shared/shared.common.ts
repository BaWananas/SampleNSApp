import { Routes } from '@angular/router';
import {HttpErrorComponent} from '@src/app/shared/components/http-error/http-error.component';
import {HttpWaitingComponent} from '@src/app/shared/components/http-waiting/http-waiting.component';
import {NotFoundComponent} from '@src/app/shared/components/not-found/not-found.component';
import {TitleNavBarComponent} from '@src/app/shared/components/title-nav-bar/title-nav-bar.component';

export const componentDeclarations: any[] = [
    HttpErrorComponent,
    HttpWaitingComponent,
    NotFoundComponent,
    TitleNavBarComponent,
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
];
