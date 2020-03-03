import {HttpError, IHttpErrorService, ISubscriptionService} from '@arhs/core';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {EventEmitter} from '@angular/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {ISessionService} from '@src/app/shared/services/ISessionService';

/**
 * Shared part of the SubscribingPage component.
 */
export abstract class SubscribingPageCommon {

    /**
     * Event used to refresh graphical component.
     *
     * Triggered when subscription was effectuated.
     */
    public subscribingEvent: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Constructor.
     * @param subscriptionService Refers to {@link ISubscriptionService}
     * @param errorService Refers to {@link IHttpErrorService}
     * @param loggerService Refers to {@link ILoggerService}
     * @param feedbackService Refers to {@link IFeedbackService}
     * @param sessionService Refers to {@link ISessionService}
     */
    protected constructor(protected subscriptionService: ISubscriptionService,
                          protected errorService: IHttpErrorService,
                          protected loggerService: ILoggerService,
                          protected feedbackService: IFeedbackService,
                          protected sessionService: ISessionService) {
    }

    /**
     * Subscribe to a group.
     * @param groupId ID of the group that the user want to subscribe.
     *
     * Call postSubscribe at the end of the request.
     */
    protected subscribe(groupId: number): void {
        this.loggerService.debug(this, 'Subscribe to group ' + groupId);
        this.subscriptionService.isSubscribedToGroup(groupId, this.sessionService.user).subscribe(value => {
            if (!value) {
                this.subscriptionService.subscribe(groupId, this.sessionService.user).subscribe((value1) => {
                    if (value1) {
                        this.loggerService.debug(this, 'Successfully subscribed to group.');
                        this.feedbackService.notifySuccess('Successfully subscribed to group !');
                        this.postSubscribe(true, groupId);
                    } else {
                        this.loggerService.error(this, 'Error occurred during subscribing.');
                        this.feedbackService.notifyError(new Error('Error occurred during subscribing.'));
                        this.postSubscribe(false, groupId);
                    }
                }, error => {
                    const formattedError = this.errorService.handleError(error);
                    this.loggerService.error(this, 'Error occurred during subscription. Error : ' + formattedError.message);
                    this.loggerService.error(this, formattedError.debugMessage);
                    this.feedbackService.notifyError(formattedError);
                    this.postSubscribe(false, groupId, formattedError);
                });
            } else {
                this.loggerService.warn(this, 'Subscription rejected, are you already subscribed ?');
                this.feedbackService.notifyWarning('Subscription rejected, are you already subscribed ?');
                this.postSubscribe(false, groupId);
            }
        }, error => {
            const formattedError = this.errorService.handleError(error);
            this.loggerService.error(this, 'Error occurred during checking if already subscribed. Error : ' + formattedError.message);
            this.loggerService.error(this, formattedError.debugMessage);
            this.feedbackService.notifyError(formattedError);
            this.postSubscribe(false, groupId, formattedError);
        });
    }

    /**
     * Action called after a subscription request.
     * @param succeeds If the subscription succeeds or not.
     * @param groupId ID of the subscribed group.
     * @param error An optional error.
     */
    protected abstract postSubscribe(succeeds: boolean, groupId: number, error?: HttpError): void;
}
