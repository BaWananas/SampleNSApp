import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

export const imports = [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
];

/**
 * Shared module of the App.
 */
@NgModule({
    declarations: [
        componentDeclarations,
    ],
    imports: [
        imports
    ],
    exports: [
        componentDeclarations,
    ]
})
export class SharedModule { }
