import {Component, OnInit} from '@angular/core';
import {GestureEventData} from '@nativescript/core';
import {SubscribingPageCommon} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Mobile implementation of {@link SubscribingPageCommon}
 */
@Component({
    selector: 'app-subscribing-page',
    templateUrl: './subscribing-page.component.tns.html',
    styleUrls: ['./subscribing-page.component.css']
})
export class SubscribingPageComponent extends SubscribingPageCommon implements OnInit {

    /**
     * @ignore
     */
    private animationService: IMobileAnimationService;

    /**
     * Refers to {@link SubscribingPageCommon}
     * @param subscriptionService
     * @param errorService
     * @param loggerService
     * @param animationService
     * @param feedbackService
     * @param sessionService
     */
    constructor(subscriptionService: SubscriptionService,
                errorService: HttpErrorService,
                loggerService: LoggerService,
                animationService: MobileAnimationService,
                feedbackService: FeedbackService,
                sessionService: SessionService) {
        super(subscriptionService, errorService, loggerService, feedbackService, sessionService);
        this.animationService = animationService;
    }

    /**
     * Refers to {@link OnInit}
     */
    ngOnInit() {
    }

    /**
     * Refers to {@link SubscribingPageCommon}
     * @param succeeds
     * @param groupId
     * @param error
     */
    protected postSubscribe(succeeds: boolean, groupId: number, error?: HttpError): void {
        if (succeeds && !error) {
            this.subscribingEvent.emit(groupId);
        }
    }

    /**
     * Animate the page buttons.
     * @param event
     */
    public animateButtons(event: GestureEventData): void {
        this.animationService.animate<TapAnimation>(event.view, TapAnimation, false);
    }

}
