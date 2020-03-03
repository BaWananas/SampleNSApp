import {Component, EventEmitter, OnInit} from '@angular/core';
import {GestureEventData, NavigatedData, Page} from '@nativescript/core';
import {environment} from '@src/environments/environment';
import {IMobileAnimationService, MobileAnimationService, TapAnimation} from '@arhs/ui';
import {RouterExtensions} from '@nativescript/angular';
import {SubscriptionHomeCommon} from '@src/app/subscription/components/pages/subscription-home/subscription-home.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Mobile implementation of {@link SubscriptionHomeCommon}
 */
@Component({
    selector: 'app-subscription-home',
    templateUrl: './subscription-home.component.tns.html',
    styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent extends SubscriptionHomeCommon implements OnInit {

    /**
     * @ignore
     */
    private animationService: IMobileAnimationService;
    /**
     * Boolean used to verify if page already loaded or not.
     * Indeed, we must reload list of this page each time we navigate to it.
     */
    public isInitiated = false;
    /**
     * Refresh entire list event to reload graphical components.
     */
    public refreshLists: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Refers to {@link SubscriptionHomeCommon}
     * @param page
     * @param animationService
     * @param routerExtensions
     * @param subscriptionService
     * @param errorService
     * @param loggerService
     * @param feedbackService
     * @param sessionService
     */
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

    /**
     * Refers to {@link OnInit}
     */
    ngOnInit() {
    }

    /**
     * Called when navigating to this page. Called after navigation performed.
     * @param args Navigating arguments.
     */
    public onNavigatedTo(args: NavigatedData) {
        if (this.isInitiated) {
            this.loggerService.debug(this, 'Reloading page.');
            this.refreshLists.emit();
        } else {
            this.isInitiated = true;
        }

    }

    /**
     * Animate the buttons of the page.
     * @param event
     */
    public animateButton(event: GestureEventData): void {
        this.animationService.animate<TapAnimation>(event.view, TapAnimation);
    }

    /**
     * Navigate to subscribing page.
     */
    public navToSubscribing(): void {
        this.routerExtensions.navigate(['/subscription/subscribing'],
            {clearHistory: false, transition: environment.defaultRoutingTransition});
    }

    /**
     * Navigate to subscription setting page.
     */
    public navToSettings(): void {
        this.routerExtensions.navigate(['/subscription/settings'], {
            clearHistory: false,
            transition: environment.defaultRoutingTransition
        });
    }

    /**
     * Refers to {@link SubscriptionHomeCommon}
     * @param succeeds
     * @param groupId
     * @param error
     */
    protected postUnsubscription(succeeds: boolean, groupId: number, error?: HttpError): void {
        if (succeeds && !error) {
            this.unsubscriptionEvent.emit(groupId);
        }
    }

}
