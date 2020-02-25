import {HttpError, IHttpErrorService, ISubscriptionService} from '@arhs/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {EventEmitter} from '@angular/core';

export abstract class SubscriptionHomeCommon {

    public unsubscriptionEvent: EventEmitter<number> = new EventEmitter<number>();

    protected constructor(protected subscriptionService: ISubscriptionService,
                          protected authenticationService: IAuthenticationService,
                          protected loggerService: ILoggerService,
                          protected errorService: IHttpErrorService) {
    }

    protected unsubscribe(groupId: number): void {
        this.loggerService.debug(this, 'Unsubscribe to group ' + groupId + '.');
        this.subscriptionService.isSubscribedToGroup(groupId, this.authenticationService.getAuthenticatedUserId()).subscribe((value) => {
            if (value) {
                this.subscriptionService.unsubscribeToGroup(groupId, this.authenticationService.getAuthenticatedUserId()).subscribe(
                    () => {
                        this.loggerService.debug(this, 'Successfully unsubscribed to group ' + groupId + '.');
                        this.postUnsubscription(true, groupId);
                    }, error => {
                        const formattedError = this.errorService.handleError(error);
                        this.loggerService.error(this, 'Error occurred during unsubscription. Error : ' + formattedError.message);
                        this.loggerService.error(this, formattedError.debugMessage);
                        this.postUnsubscription(false, groupId, formattedError);
                    });
            } else {
                this.loggerService.warn(this, 'Unsubscription rejected, are you already unsubscribed ?');
                this.postUnsubscription(false, groupId);
            }
        }, error => {
            const formattedError = this.errorService.handleError(error);
            this.loggerService.error(this, 'Error occurred during checking if already subscribed. Error : ' + formattedError.message);
            this.loggerService.error(this, formattedError.debugMessage);
            this.postUnsubscription(false, groupId, formattedError);
        });
    }

    protected abstract postUnsubscription(succeeds: boolean, groupId: number, error?: HttpError): void;
}
