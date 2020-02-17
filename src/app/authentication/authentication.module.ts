import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from '@src/app/authentication/authentication.common';
import { LoginPageComponent } from '@src/app/authentication/components/login/login-page/login-page.component';
import {LoginFormComponent} from '@src/app/authentication/components/login/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [LoginFormComponent, LoginPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthenticationModule {
}
