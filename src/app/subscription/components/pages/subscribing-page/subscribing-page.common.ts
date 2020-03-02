import {HttpError, IHttpErrorService, ISubscriptionService} from '@arhs/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {EventEmitter} from '@angular/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {ISessionService} from '@src/app/shared/services/ISessionService';

export abstract class SubscribingPageCommon {

    public subscribingEvent: EventEmitter<number> = new EventEmitter<number>();

    protected constructor(protected subscriptionService: ISubscriptionService,
                          protected errorService: IHttpErrorService,
                          protected loggerService: ILoggerService,
                          protected feedbackService: IFeedbackService,
                          protected sessionService: ISessionService) {
    }

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

    protected abstract postSubscribe(succeeds: boolean, groupId: number, error?: HttpError): void;
}
