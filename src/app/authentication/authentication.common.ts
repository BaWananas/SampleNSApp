import {Routes} from '@angular/router';
import {LoginPageComponent} from '@src/app/authentication/components/login/login-page/login-page.component';
import {LoginFormComponent} from '@src/app/authentication/components/login/login-form/login-form.component';

/**
 * Shared components.
 */
export const componentDeclarations: any[] = [
    LoginFormComponent,
    LoginPageComponent
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
    {path: 'login', component: LoginPageComponent},
];
