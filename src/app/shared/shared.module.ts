import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';


@NgModule({
    declarations: [
        componentDeclarations,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    exports: [
        componentDeclarations,
    ]
})
export class SharedModule { }
