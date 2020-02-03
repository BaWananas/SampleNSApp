import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from '@src/app/subscription/models/Subscription';
import {Group} from '@src/app/subscription/models/Group';
import {IGroupService} from '@src/app/subscription/services/IGroupService';
import {GroupService} from '@src/app/subscription/services/implementations/group.service';
import {switchMap} from 'rxjs/operators';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ISubscriptionService} from '@src/app/subscription/services/ISubscriptionService';
import {SubscriptionService} from '@src/app/subscription/services/implementations/subscription.service';
import {HttpError} from '@src/app/shared/models/HttpError/HttpError';
import {IHttpErrorService} from '@src/app/shared/services/IHttpErrorService';
import {HttpErrorService} from '@src/app/shared/services/implementations/http-error.service';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  // Services
  private groupService: IGroupService;
  private loggerService: ILoggerService;
  private subscriptionService: ISubscriptionService;
  private errorService: IHttpErrorService;

  group: Group;
  subscriptions: Subscription[] = undefined;
  error: HttpError;

  constructor(private route: ActivatedRoute,
              groupService: GroupService,
              loggerService: LoggerService,
              subscriptionService: SubscriptionService,
              errorService: HttpErrorService) {
    this.groupService = groupService;
    this.loggerService = loggerService;
    this.subscriptionService = subscriptionService;
    this.errorService = errorService;
  }

  ngOnInit() {
    this.getGroup();
  }

  getGroup(): void {
    this.error = null;
    this.group = null;
    this.loggerService.info(this, 'Retrieving group.');

    // Get the id from the url and then, try to get the group.
    this.route.paramMap.pipe(
        switchMap((value: ParamMap) => {
          return this.groupService.getGroupById(+value.get('id'));
        })
    ).subscribe(value => {
      this.group = value;
      this.getSubscriptions();
    }, (error: HttpErrorResponse) => {
      this.loggerService.error(this, 'Error occurred during retrieving group. Error : ' + JSON.stringify(error));
      this.error = this.errorService.handleError(error);
    });
  }

  getSubscriptions(): void {
    this.error = null;
    this.subscriptions = undefined;
    this.loggerService.info(this, 'Retrieving subscriptions.');

    this.subscriptionService.getSubscriptionsByGroupId(this.group.id).subscribe(value => {
      if (value._embedded) {
        this.subscriptions = value._embedded.items;
      } else {
        this.subscriptions = [];
      }
    }, (error: HttpErrorResponse) => {
      this.loggerService.error(this, 'Error occurred during retrieving subscriptions. Error : ' + JSON.stringify(error));
      this.error = this.errorService.handleError(error);
    });
  }

  unsubscribe(id: number, index: number): void {
    this.error = null;
    this.loggerService.info(this, 'Deleting subscriptions.');

    this.subscriptionService.unsubscribe(id).subscribe(value => {
      if (index >= 0) {
        this.subscriptions.splice(index, 1);
      }
    }, (error: HttpErrorResponse) => {
      this.loggerService.error(this, 'Error occurred during deleting subscriptions. Error : ' + JSON.stringify(error));
      this.error = this.errorService.handleError(error);
    });
  }
}
