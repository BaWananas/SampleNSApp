import {Component, OnInit} from '@angular/core';
import {SubscribingPageCommon} from '@src/app/subscription/components/pages/subscribing-page/subscribing-page.common';
import {HttpError, HttpErrorService, SubscriptionService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

@Component({
  selector: 'app-subscribing-page',
  templateUrl: './subscribing-page.component.html',
  styleUrls: ['./subscribing-page.component.css']
})
export class SubscribingPageComponent extends SubscribingPageCommon implements OnInit {

  constructor(subscriptionService: SubscriptionService,
              authenticationService: AuthenticationService,
              errorService: HttpErrorService,
              loggerService: LoggerService) {
    super(subscriptionService, authenticationService, errorService, loggerService);
  }

  ngOnInit() {
  }

  protected postSubscribe(succeeds: boolean, groupId: number, error?: HttpError): void {
    if (succeeds && !error) {
      this.subscribingEvent.emit(groupId);
    }
  }

}
