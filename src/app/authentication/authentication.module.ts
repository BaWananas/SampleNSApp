import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {componentDeclarations, routes} from '@src/app/authentication/authentication.common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        componentDeclarations
    ],
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
