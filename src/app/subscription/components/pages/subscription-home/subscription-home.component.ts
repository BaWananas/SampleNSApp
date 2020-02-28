import {Component, OnInit} from '@angular/core';
import {SubscriptionHomeCommon} from '@src/app/subscription/components/pages/subscription-home/subscription-home.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {faPlus, faSlidersH, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
  selector: 'app-subscription-home',
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent extends SubscriptionHomeCommon implements OnInit {

  public unsubscribeIcon = faTrashAlt;
  public navToSubscribingIcon = faPlus;
  public navToSubscriptionSettingsIcon = faSlidersH;

  constructor(subscriptionService: SubscriptionService,
              errorService: HttpErrorService,
              loggerService: LoggerService,
              feedbackService: FeedbackService,
              sessionService: SessionService) {
    super(subscriptionService, loggerService, errorService, feedbackService, sessionService);
  }

  ngOnInit() {
  }

  protected postUnsubscription(succeeds: boolean, groupId: number, error?: HttpError): void {
    if (succeeds && !error) {
      this.unsubscriptionEvent.emit(groupId);
    }
  }

}
