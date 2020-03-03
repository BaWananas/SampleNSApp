import {Component, OnInit} from '@angular/core';
import {SubscriptionHomeCommon} from '@src/app/subscription/components/pages/subscription-home/subscription-home.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {faPlus, faSlidersH, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Web implementation of {@link SubscriptionHomeCommon}
 */
@Component({
  selector: 'app-subscription-home',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent extends SubscriptionHomeCommon implements OnInit {

  /**
   * Unsubscription button icon.
   */
  public unsubscribeIcon = faTrashAlt;
  /**
   * Navigation to subscribing page icon.
   */
  public navToSubscribingIcon = faPlus;
  /**
   * Navigation to subscription settings icon.
   */
  public navToSubscriptionSettingsIcon = faSlidersH;

  /**
   * Refers to {@link SubscriptionHomeCommon}
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
    super(subscriptionService, loggerService, errorService, feedbackService, sessionService);
  }

  /**
   * Refers to {@link OnInit}
   */
  ngOnInit() {
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
