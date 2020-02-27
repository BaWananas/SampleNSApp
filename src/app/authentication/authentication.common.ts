import {Routes} from '@angular/router';
import {LoginPageComponent} from '@src/app/authentication/components/login/login-page/login-page.component';
import {LoginFormComponent} from '@src/app/authentication/components/login/login-form/login-form.component';

export const componentDeclarations: any[] = [
    LoginFormComponent,
    LoginPageComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
];
