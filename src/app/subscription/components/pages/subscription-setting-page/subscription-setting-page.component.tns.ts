import {Component, OnInit} from '@angular/core';
import {SubscriptionSettingPageCommon} from '@src/app/subscription/components/pages/subscription-setting-page/subscription-setting-page.common';
import {GestureEventData} from '@nativescript/core';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {GroupService, HttpError, HttpErrorService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';

/**
 * Mobile implementation of {@link SubscriptionSettingPageCommon}
 */
@Component({
    selector: 'app-subscription-setting-page',
    templateUrl: './subscription-setting-page.component.tns.html',
    styleUrls: ['./subscription-setting-page.component.css']
})
export class SubscriptionSettingPageComponent extends SubscriptionSettingPageCommon implements OnInit {
    /**
     * @ignore
     */
    private animationService: IMobileAnimationService;

    /**
     * Constructor.
     * Refers to {@link SubscriptionSettingPageCommon}
     * @param animationService
     * @param authenticationService
     * @param groupService
     * @param logger
     * @param errorService
     * @param feedbackService
     */
    constructor(animationService: MobileAnimationService,
                authenticationService: AuthenticationService,
                groupService: GroupService,
                logger: LoggerService,
                errorService: HttpErrorService,
                feedbackService: FeedbackService) {
        super(authenticationService, groupService, logger, errorService, feedbackService);
        this.animationService = animationService;
    }

    /**
     * Refers to {@link OnInit}
     */
    ngOnInit() {
    }

    /**
     * Animate page buttons.
     * @param event
     */
    public animateButton(event: GestureEventData): void {
        this.animationService.animate<TapAnimation>(event.view, TapAnimation);
    }

    /**
     * Refers to {@link SubscriptionSettingPageCommon}
     * @param succeeds
     * @param groupId
     * @param error
     */
    protected postGroupDeletion(succeeds: boolean, groupId: number, error?: HttpError): void {
        if (succeeds && !error) {
            this.deleteGroupEvent.emit(groupId);
        }
    }

    /**
     * Refers to {@link SubscriptionSettingPageCommon}
     * @param succeeds
     * @param error
     */
    protected postGroupCreation(succeeds: boolean, error?: HttpError): void {
        if (succeeds && !error) {
            this.createGroupEvent.emit();
        }
    }

}
