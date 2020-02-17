import {Component, EventEmitter, OnInit} from '@angular/core';
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {
  Group, GroupService,
  HttpErrorService,
  IGroupService,
  IHttpErrorService,
  ISubscriptionService,
  Subscription,
  SubscriptionService
} from '@arhs/core';
import {ITableColumn, ITableFactory, ITableOptions, TableFactoryService} from '@arhs/ui';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FormattedSubscription} from '@src/app/subscription/models/FormattedSubscription';

@Component({
  selector: 'app-user-subscriptions-list',
  templateUrl: './user-subscriptions-list.component.html',
  styleUrls: ['./user-subscriptions-list.component.css']
})
export class UserSubscriptionsListComponent implements OnInit {

  private authenticationService: IAuthenticationService;
  private subscriptionService: ISubscriptionService;
  private groupService: IGroupService;
  private tableFactory: ITableFactory;
  private logger: ILoggerService;
  private errorService: IHttpErrorService;

  groups: Group[] = [];
  subscriptions: Subscription[] = [];
  columns: ITableColumn[];
  options: ITableOptions<FormattedSubscription>;
  data: FormattedSubscription[] = [];
  onRefresh: EventEmitter<FormattedSubscription[]> = new EventEmitter<FormattedSubscription[]>();

  constructor(authenticationService: AuthenticationService,
              subscriptionService: SubscriptionService,
              tableFactory: TableFactoryService,
              logger: LoggerService,
              errorService: HttpErrorService,
              groupService: GroupService) {
    this.authenticationService = authenticationService;
    this.subscriptionService = subscriptionService;
    this.tableFactory = tableFactory;
    this.logger = logger;
    this.errorService = errorService;
    this.groupService = groupService;
  }

  ngOnInit() {
    this.getUserSubscription();
  }

  public onSelect($event: any[]) {
  }

  private initTable(): void {
    this.data = this.formatData();
    this.columns = this.tableFactory.getColumns([
        '#Group', 'Date'
    ], [
        'groupName', 'date'
    ]);
    this.options = this.tableFactory.getOptions(false, true, false, true, undefined, false, false, false);
    this.onRefresh.emit(this.data);
  }

  private getGroups(): void {
    this.logger.info(this, 'Retrieving groups.');
    this.groupService.getAllGroups().subscribe(value => {
      if (value._embedded) {
        this.groups = value._embedded.items;
        this.initTable();
      }
    }, (error) => {
      this.logger.error(this, 'Error occurred when retrieving groups. Error : ' + this.errorService.handleError(error).message);
    });
  }

  private getUserSubscription(): void {
    this.logger.info(this, 'Retrieving user subscriptions.');
    this.subscriptionService.getSubscriptionsByUserId(this.authenticationService.getAuthenticatedUserId()).subscribe(value => {
      if (value._embedded) {
        this.subscriptions = value._embedded.items;
        this.getGroups();
      }
    }, error => {
      this.logger.error(this, 'Error occurred when retrieving subscriptions. Error : ' + this.errorService.handleError(error).message);
    });
  }

  private formatData(): FormattedSubscription[] {
    const data: FormattedSubscription[] = [];
    this.subscriptions.forEach(subscription => {
      let groupName = 'Unknown';
      this.groups.forEach(group => {
        if (subscription.groupId === group.id) {
          groupName = group.name;
          return;
        }
      });
      data.push(new FormattedSubscription(groupName, null));
    });
    return data;
  }
}
