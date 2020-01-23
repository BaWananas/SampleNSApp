import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from '@src/app/subscription/models/Subscription';
import {Group} from '@src/app/subscription/models/Group';
import {IGroupService} from '@src/app/subscription/services/IGroupService';
import {GroupServiceService} from '@src/app/subscription/services/implementations/group-service.service';
import {switchMap} from 'rxjs/operators';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  // Services
  private groupService: IGroupService;
  private loggerService: ILoggerService;

  group: Group;
  groupError: HttpErrorResponse;
  subscriptions: Subscription[] = [];
  subscriptionsError: HttpErrorResponse;

  constructor(private route: ActivatedRoute, groupService: GroupServiceService, loggerService: LoggerService) {
    this.groupService = groupService;
    this.loggerService = loggerService;
  }

  ngOnInit() {
    this.getGroup();
  }

  getGroup(): void {
    this.loggerService.info(this, 'Retrieving group.');
    this.groupError = null;
    this.group = null;

    // Get the id from the url and then, try to get the group.
    this.route.paramMap.pipe(
        switchMap((value: ParamMap) => {
          return this.groupService.getGroupById(+value.get('id'));
        })
    ).subscribe(value => {
      this.group = value;
    }, error => {
      this.loggerService.error(this, 'Error occurred during retrieving group. Error : ' + JSON.stringify(error));
      this.groupError = error;
    });
  }

  getSubscriptions(): void {
    this.loggerService.info(this, 'Retrieving subscriptions.');
    this.subscriptions = [];
    this.subscriptionsError = null;

    // TODO
  }

}
