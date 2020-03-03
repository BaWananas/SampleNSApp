import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

/**
 * Shared module of the App.
 */
@NgModule({
    declarations: [
        componentDeclarations,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        FontAwesomeModule
    ],
    exports: [
        componentDeclarations,
    ]
})
export class SharedModule { }
