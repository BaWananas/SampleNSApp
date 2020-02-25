import {Component, OnInit} from '@angular/core';
import {SubscriptionSettingPageCommon} from '@src/app/subscription/components/pages/subscription-setting-page/subscription-setting-page.common';
import {GroupService, HttpError, HttpErrorService} from '@arhs/core';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';

@Component({
  selector: 'app-subscription-setting-page',
  templateUrl: './subscription-setting-page.component.html',
  styleUrls: ['./subscription-setting-page.component.css']
})
export class SubscriptionSettingPageComponent extends SubscriptionSettingPageCommon  implements OnInit {

  constructor(authenticationService: AuthenticationService,
              groupService: GroupService,
              logger: LoggerService,
              errorService: HttpErrorService) {
    super(authenticationService, groupService, logger, errorService);
  }

  ngOnInit() {
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
