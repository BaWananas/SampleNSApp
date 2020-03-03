import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {componentDeclarations, routes} from '@src/app/authentication/authentication.common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

/**
 * Authentication module of the App.
 */
@NgModule({
    declarations: [
        componentDeclarations
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FontAwesomeModule
    ],
    exports: [
        RouterModule
    ]
})
export class AuthenticationModule {
}
