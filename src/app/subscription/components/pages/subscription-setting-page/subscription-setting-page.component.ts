import {Component, OnInit} from '@angular/core';
import {SubscriptionSettingPageCommon} from '@src/app/subscription/components/pages/subscription-setting-page/subscription-setting-page.common';
import {GroupService, HttpError, HttpErrorService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

/**
 * Web implementation of {@link SubscriptionSettingPageCommon}
 */
@Component({
    selector: 'app-subscription-setting-page',
    templateUrl: './subscription-setting-page.component.html',
    styleUrls: ['./subscription-setting-page.component.css']
})
export class SubscriptionSettingPageComponent extends SubscriptionSettingPageCommon implements OnInit {

    /**
     * Delete button icon.
     */
    public deleteIcon = faTrashAlt;

    /**
     * Constructor.
     * Refers to {@link SubscriptionSettingPageCommon}
     * @param authenticationService
     * @param groupService
     * @param logger
     * @param errorService
     * @param feedbackService
     */
    constructor(authenticationService: AuthenticationService,
                groupService: GroupService,
                logger: LoggerService,
                errorService: HttpErrorService,
                feedbackService: FeedbackService) {
        super(authenticationService, groupService, logger, errorService, feedbackService);
    }

    /**
     * Refers to {@link OnInit}
     */
    ngOnInit() {
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
