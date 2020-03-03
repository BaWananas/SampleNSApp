import {Component, OnInit} from '@angular/core';
import {SubscribingPageCommon} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';

/**
 * Web implementation of {@link SubscribingPageCommon}
 */
@Component({
    selector: 'app-subscribing-page',
    templateUrl: './subscribing-page.component.html',
    styleUrls: ['./subscribing-page.component.css']
})
export class SubscribingPageComponent extends SubscribingPageCommon implements OnInit {

    /**
     * Subscription button icon.
     */
    public subscribeIcon = faUserPlus;

    /**
     * Refers to {@link SubscribingPageCommon}
     * @param subscriptionService
     * @param errorService
     * @param loggerService
     * @param feedbackService
     * @param sessionService
     */
    constructor(subscriptionService: SubscriptionService,
                errorService: HttpErrorService,
                loggerService: LoggerService,
                feedbackService: FeedbackService,
                sessionService: SessionService) {
        super(subscriptionService, errorService, loggerService, feedbackService, sessionService);
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

}
