import {Component, OnInit} from '@angular/core';
import {SubscriptionSettingPageCommon} from '@src/app/subscription/components/pages/subscription-setting-page/subscription-setting-page.common';
import {GestureEventData, Page} from '@nativescript/core';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {GroupService, HttpError, HttpErrorService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';

@Component({
    selector: 'app-subscription-setting-page',
    templateUrl: './subscription-setting-page.component.tns.html',
    styleUrls: ['./subscription-setting-page.component.css']
})
export class SubscriptionSettingPageComponent extends SubscriptionSettingPageCommon implements OnInit {
    private animationService: IMobileAnimationService;

    constructor(private page: Page,
                animationService: MobileAnimationService,
                authenticationService: AuthenticationService,
                groupService: GroupService,
                logger: LoggerService,
                errorService: HttpErrorService,
                feedbackService: FeedbackService) {
        super(authenticationService, groupService, logger, errorService, feedbackService);
        page.actionBarHidden = true;
        this.animationService = animationService;
    }

    ngOnInit() {
    }

    public animateButton(event: GestureEventData): void {
        this.animationService.animate<TapAnimation>(event.view, TapAnimation);
    }

    protected postGroupDeletion(succeeds: boolean, groupId: number, error?: HttpError): void {
        if (succeeds && !error) {
            this.deleteGroupEvent.emit(groupId);
        }
    }

    protected postGroupCreation(succeeds: boolean, error?: HttpError): void {
        if (succeeds && !error) {
            this.createGroupEvent.emit();
        }
    }

}
