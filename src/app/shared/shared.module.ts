import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        componentDeclarations,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        componentDeclarations,
    ]
})
export class SharedModule { }
