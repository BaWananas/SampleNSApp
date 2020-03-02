import {Component, EventEmitter, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
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
import {RefreshableListComponent} from '@src/app/shared/models/RefreshableListComponent';
import {isNumber} from 'util';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
  selector: 'app-user-subscriptions-list',
  templateUrl: './user-subscriptions-list.component.html',
  styleUrls: ['./user-subscriptions-list.component.css']
})
export class UserSubscriptionsListComponent extends RefreshableListComponent<FormattedSubscription, number> implements OnInit, OnDestroy {

  @Input() elementDetails: TemplateRef<any>;

  /* Services */
  private subscriptionService: ISubscriptionService;
  private groupService: IGroupService;
  private tableFactory: ITableFactory;
  private logger: ILoggerService;
  private errorService: IHttpErrorService;
  private feedbackService: IFeedbackService;
  private sessionService: ISessionService;

  /* Data from API */
  groups: Group[] = [];
  userSubscriptions: Subscription[] = [];

  /* Formatted data for table */
  tableColumns: ITableColumn[];
  tableOptions: ITableOptions<FormattedSubscription>;
  data: FormattedSubscription[] = undefined;
  onRefresh: EventEmitter<FormattedSubscription[]> = new EventEmitter<FormattedSubscription[]>();

  /* API requests state (for waiting components) */
  isAPIRequestFinalized = false;

  constructor(subscriptionService: SubscriptionService,
              tableFactory: TableFactoryService,
              logger: LoggerService,
              errorService: HttpErrorService,
              groupService: GroupService,
              feedbackService: FeedbackService,
              sessionService: SessionService) {
    super();
    this.subscriptionService = subscriptionService;
    this.tableFactory = tableFactory;
    this.logger = logger;
    this.errorService = errorService;
    this.groupService = groupService;
    this.feedbackService = feedbackService;
    this.sessionService = sessionService;
    this.initList();
  }

  ngOnInit() {
    super.ngOnInit();
    this.getUserSubscription();
  }

  // TODO
  public onSelect($event: any[]) {
  }

  private initList(): void {
    this.data = this.formatData();
    this.tableColumns = this.tableFactory.getColumns([
        '#Group', 'Date'
    ], [
        'groupName', 'date'
    ]);
    this.tableOptions = this.tableFactory.getOptions(false, true, false, true, [10, 1, 5, 25], false, false, false);
  }

  private getUserSubscription(): void {
    this.isAPIRequestFinalized = false;
    this.data = undefined;
    this.logger.debug(this, 'Retrieving user subscriptions.');
    this.subscriptionService.getSubscriptionsByUserId(this.sessionService.user).subscribe(value => {
      if (value._embedded) {
        this.userSubscriptions = value._embedded.items;
        this.getGroups();
      } else {
        this.userSubscriptions = [];
        this.data = [];
      }
    }, error => {
      const formattedError = this.errorService.handleError(error);
      this.logger.error(this, 'Error occurred when retrieving subscriptions. Error : ' + formattedError.message);
      this.feedbackService.notifyError(formattedError);
      this.isAPIRequestFinalized = true;
    }, () => {
      this.isAPIRequestFinalized = true;
    });
  }

  private getGroups(): void {
    this.isAPIRequestFinalized = false;
    this.logger.debug(this, 'Retrieving groups.');
    this.groupService.getAllGroups().subscribe(value => {
      if (value._embedded) {
        this.groups = value._embedded.items;
        this.refreshList(this.formatData());
      }
    }, (error) => {
      const formattedError = this.errorService.handleError(error);
      this.logger.error(this, 'Error occurred when retrieving groups. Error : ' + this.errorService.handleError(error).message);
      this.feedbackService.notifyError(formattedError);
      this.isAPIRequestFinalized = true;
    }, () => {
      this.isAPIRequestFinalized = true;
    });
  }

  private formatData(initialData?: Subscription[]): FormattedSubscription[] {
    const data: FormattedSubscription[] = [];

    if (!initialData) {
      initialData = this.userSubscriptions;
    }

    initialData.forEach((subscription) => {
      let groupName = 'Unknown';
      this.groups.forEach(group => {
        if (subscription.groupId === group.id) {
          groupName = group.name;
          return;
        }
      });
      data.push(new FormattedSubscription(groupName, null, subscription.groupId, subscription.userId, subscription.id));
    });

    return data;
  }

  protected addElement(element: FormattedSubscription | number): void {
    if (this.userSubscriptions) {
      this.data.push((isNumber(element) ? this.convertToElement(element as number) : element as FormattedSubscription));
      this.refreshList(this.data);
    }
  }

  protected removeElement(element: FormattedSubscription | number): void {
    if (this.userSubscriptions) {
      this.data.splice(this.findIndex((isNumber(element) ? element as number : this.convertToId(element as FormattedSubscription))), 1);
      this.refreshList(this.data);
    }
  }

  protected convertToElement(groupId: number): FormattedSubscription {
    let sub: FormattedSubscription = null;
    this.userSubscriptions.forEach(value => {
      if (value.groupId === groupId) {
        sub = this.formatData([value])[0];
      }
    });
    return undefined;
  }

  protected convertToId(element: FormattedSubscription): number {
    return element.groupId;
  }

  protected refreshList(newList?: FormattedSubscription[]): void {
    if (newList) {
      this.data = newList;
      this.onRefresh.emit(newList);
    } else {
      this.getUserSubscription();
    }
  }

  private findIndex(groupId: number): number {
    let index = -1;
    this.data.forEach((value, index1) => {
      if (value.groupId === groupId) {
        index = index1;
        return;
      }
    });
    return index;
  }
}
