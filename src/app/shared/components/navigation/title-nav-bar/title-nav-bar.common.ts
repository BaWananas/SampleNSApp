import {Input} from '@angular/core';

export abstract class TitleNavBarCommon {
    @Input() title: string;
    @Input() subTitle: string;

    abstract goBack(): void;
    abstract goHome(): void;
}
