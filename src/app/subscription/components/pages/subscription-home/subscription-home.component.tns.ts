import {Component, EventEmitter, OnInit} from '@angular/core';
import {GestureEventData, Page, NavigatedData} from '@nativescript/core';
import {environment} from '@src/environments/environment';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {RouterExtensions} from '@nativescript/angular';
import {SubscriptionHomeCommon} from '@src/app/subscription/components/pages/subscription-home/subscription-home.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
    selector: 'app-subscription-home',
    templateUrl: './subscription-home.component.tns.html',
    styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent extends SubscriptionHomeCommon implements OnInit {

    private animationService: IMobileAnimationService;
    public isInitiated = false;
    public refreshLists: EventEmitter<void> = new EventEmitter<void>();

    constructor(page: Page,
                animationService: MobileAnimationService,
                private routerExtensions: RouterExtensions,
                subscriptionService: SubscriptionService,
                errorService: HttpErrorService,
                loggerService: LoggerService,
                feedbackService: FeedbackService,
                sessionService: SessionService) {
        super(subscriptionService, loggerService, errorService, feedbackService, sessionService);
        page.on('navigatingTo', this.onNavigatedTo, this);
        this.animationService = animationService;
    }

    ngOnInit() {
    }

    public onNavigatedTo(args: NavigatedData) {
        if (this.isInitiated) {
            this.loggerService.debug(this, 'Reloading page.');
            this.refreshLists.emit();
        } else {
            this.isInitiated = true;
        }

    }

    public animateButton(event: GestureEventData): void {
        this.animationService.animate<TapAnimation>(event.view, TapAnimation);
    }

    public navToSubscribing(): void {
        this.routerExtensions.navigate(['/subscription/subscribing'],
            {clearHistory: false, transition: environment.defaultRoutingTransition});
    }

    public navToSettings(): void {
        this.routerExtensions.navigate(['/subscription/settings'], {
            clearHistory: false,
            transition: environment.defaultRoutingTransition
        });
    }

    protected postUnsubscription(succeeds: boolean, groupId: number, error?: HttpError): void {
        if (succeeds && !error) {
            this.unsubscriptionEvent.emit(groupId);
        }
    }

}
