import {EventEmitter} from '@angular/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {Group, HttpError, IGroupService, IHttpErrorService} from '@arhs/core';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';

/**
 * Shared part of the SubscriptionSettingPage component.
 */
export abstract class SubscriptionSettingPageCommon {

    /**
     * Event used to refresh graphical component.
     *
     * Triggered when group was deleted.
     */
    public deleteGroupEvent: EventEmitter<number> = new EventEmitter<number>();
    /**
     * Event used to refresh graphical component.
     *
     * Triggered when group was created.
     */
    public createGroupEvent: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor.
     * @param authenticationService Refers to {@link IAuthenticationService}
     * @param groupService Refers to {@link IGroupService}
     * @param logger Refers to {@link ILoggerService}
     * @param errorService Refers to {@link IHttpErrorService}
     * @param feedbackService Refers to {@link IFeedbackService}
     */
    protected constructor(protected authenticationService: IAuthenticationService,
                          protected groupService: IGroupService,
                          protected logger: ILoggerService,
                          protected errorService: IHttpErrorService,
                          protected feedbackService: IFeedbackService) {
    }

    /**
     * Delete a group.
     * @param groupId The group ID.
     */
    public deleteGroup(groupId: number): void {
        this.groupService.deleteGroup(groupId).subscribe(() => {
            this.logger.debug(this, 'Group successfully removed.');
            this.feedbackService.notifySuccess('Group successfully removed !');
            this.postGroupDeletion(true, groupId);
        }, error => {
            const formattedError = this.errorService.handleError(error);
            this.logger.error(this, 'Error occurred removing group. Error : ' + formattedError.message);
            this.logger.error(this, formattedError.debugMessage);
            this.feedbackService.notifyError(formattedError);
            this.postGroupDeletion(false, groupId, formattedError);
        });
    }

    /**
     * Create a group.
     * @param group The group object.
     */
    public createGroup(group: Group): void {
        this.groupService.createGroup(group.name, group.associationId, group.description).subscribe(value => {
            if (value) {
                this.logger.debug(this, 'Group successfully created.');
                this.feedbackService.notifySuccess('Group successfully created !');
                this.postGroupCreation(true);
            } else {
                this.logger.error(this, 'Error occurred during creating group, but 30X response returned.');
                this.feedbackService.notifyError(new Error('Error occurred during creating group, but 30X response returned.'));
                this.postGroupCreation(false);
            }
        }, error => {
            const formattedError = this.errorService.handleError(error);
            this.logger.error(this, 'Error occurred during creating group. Error : ' + formattedError.message);
            this.logger.error(this, formattedError.debugMessage);
            this.feedbackService.notifyError(formattedError);
            this.postGroupDeletion(false, group.id, formattedError);
        });
    }

    /**
     * Action called after a group deletion request.
     * @param succeeds If the deletion succeeds or not.
     * @param groupId ID of the subscribed group.
     * @param error An optional error.
     */
    protected abstract postGroupDeletion(succeeds: boolean, groupId: number, error?: HttpError): void;

    /**
     * Action called after a group creation request.
     * @param succeeds If the creation succeeds or not.
     * @param error An optional error.
     */
    protected abstract postGroupCreation(succeeds: boolean, error?: HttpError): void;
}
