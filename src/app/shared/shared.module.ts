import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {componentDeclarations} from '@src/app/shared/shared.common';
import { HttpWaitingComponent } from '@src/app/shared/components/http-waiting/http-waiting.component';
import { NotFoundComponent } from '@src/app/shared/components/not-found/not-found.component';



@NgModule({
    declarations: [
        componentDeclarations,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        componentDeclarations,
    ]
})
export class SharedModule { }
