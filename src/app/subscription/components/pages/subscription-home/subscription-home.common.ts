import {HttpError, IHttpErrorService, ISubscriptionService} from '@arhs/core';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {EventEmitter} from '@angular/core';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {ISessionService} from '@src/app/shared/services/ISessionService';

export abstract class SubscriptionHomeCommon {

    public unsubscriptionEvent: EventEmitter<number> = new EventEmitter<number>();

    protected constructor(protected subscriptionService: ISubscriptionService,
                          protected loggerService: ILoggerService,
                          protected errorService: IHttpErrorService,
                          protected feedbackService: IFeedbackService,
                          protected sessionService: ISessionService) {
    }

    protected unsubscribe(groupId: number): void {
        this.loggerService.debug(this, 'Unsubscribe to group ' + groupId + '.');
        this.subscriptionService.isSubscribedToGroup(groupId, this.sessionService.user).subscribe((value) => {
            if (value) {
                this.subscriptionService.unsubscribeToGroup(groupId, this.sessionService.user).subscribe(
                    () => {
                        this.loggerService.debug(this, 'Successfully unsubscribed to group ' + groupId + '.');
                        this.feedbackService.notifySuccess('Successfully unsubscribed to group !');
                        this.postUnsubscription(true, groupId);
                    }, error => {
                        const formattedError = this.errorService.handleError(error);
                        this.loggerService.error(this, 'Error occurred during unsubscription. Error : ' + formattedError.message);
                        this.loggerService.error(this, formattedError.debugMessage);
                        this.feedbackService.notifyError(formattedError);
                        this.postUnsubscription(false, groupId, formattedError);
                    });
            } else {
                this.loggerService.warn(this, 'Unsubscription rejected, are you already unsubscribed ?');
                this.feedbackService.notifyWarning('Unsubscription rejected, are you already unsubscribed ?');
                this.postUnsubscription(false, groupId);
            }
        }, error => {
            const formattedError = this.errorService.handleError(error);
            this.loggerService.error(this, 'Error occurred during checking if already subscribed. Error : ' + formattedError.message);
            this.loggerService.error(this, formattedError.debugMessage);
            this.feedbackService.notifyError(formattedError);
            this.postUnsubscription(false, groupId, formattedError);
        });
    }

    protected abstract postUnsubscription(succeeds: boolean, groupId: number, error?: HttpError): void;
}
