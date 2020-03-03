import {Input} from '@angular/core';

/**
 * Represent a simple navigation bar with title.
 *
 * Shared part of TitleNavBarComponent
 */
export abstract class TitleNavBarCommon {
    /**
     * Title of the navBar.
     */
    @Input() title: string;
    /**
     * Subtitle of the navBar.
     */
    @Input() subTitle: string;

    /**
     * Navigate backward.
     */
    abstract goBack(): void;

    /**
     * Navigate to home.
     */
    abstract goHome(): void;
}
