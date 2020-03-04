import {Component, EventEmitter, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {
    Group,
    GroupService,
    HttpErrorService,
    IGroupService,
    IHttpErrorService,
    ISubscriptionService,
    Subscription,
    SubscriptionService
} from '@arhs/core';
import {ITableColumn, ITableFactory, ITableOptions, TableFactoryService} from '@arhs/ui';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FormattedSubscription} from '@src/app/subscription/models/FormattedSubscription';
import {RefreshableListComponent} from '@src/app/shared/models/RefreshableListComponent';
import {isNumber} from 'util';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Subscription list component for both web and mobile platforms.
 */
@Component({
    selector: 'app-user-subscriptions-list',
    templateUrl: './user-subscriptions-list.component.html',
    styleUrls: ['./user-subscriptions-list.component.css']
})
export class UserSubscriptionsListComponent extends RefreshableListComponent<FormattedSubscription, number> implements OnInit, OnDestroy {

    /**
     * Optional detail that complete each element.
     */
    @Input() elementDetails: TemplateRef<any>;

    /* Services */
    /**
     * @ignore
     */
    private subscriptionService: ISubscriptionService;
    /**
     * @ignore
     */
    private groupService: IGroupService;
    /**
     * @ignore
     */
    private tableFactory: ITableFactory;
    /**
     * @ignore
     */
    private logger: ILoggerService;
    /**
     * @ignore
     */
    private errorService: IHttpErrorService;
    /**
     * @ignore
     */
    private feedbackService: IFeedbackService;
    /**
     * @ignore
     */
    private sessionService: ISessionService;

    // Data from API
    /**
     * The groups list.
     */
    groups: Group[] = [];
    /**
     * The user subscriptions list.
     */
    userSubscriptions: Subscription[] = [];

    // Formatted data for table
    /**
     * Columns for the graphical component.
     */
    tableColumns: ITableColumn[];
    /**
     * Option for the graphical component.
     */
    tableOptions: ITableOptions<FormattedSubscription>;
    /**
     * The formatted subscription for the graphical component.
     */
    data: FormattedSubscription[] = undefined;
    /**
     * Event triggered for refreshing the graphical component.
     */
    onRefresh: EventEmitter<FormattedSubscription[]> = new EventEmitter<FormattedSubscription[]>();

    /**
     *  API requests state (for waiting components)
     */
    isAPIRequestFinalized = false;

    /**
     * Constructor.
     * @param subscriptionService Refers to {@link ISubscriptionService}
     * @param tableFactory Refers to {@link ITableFactory}
     * @param logger Refers to {@link ILoggerService}
     * @param errorService Refers to {@link IHttpErrorService}
     * @param groupService Refers to {@link IGroupService}
     * @param feedbackService Refers to {@link IFeedbackService}
     * @param sessionService Refers to {@link ISessionService}
     */
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

    /**
     * Refers to {@link OnInit}
     *
     * Call the getUserSubscription method.
     */
    ngOnInit() {
        super.ngOnInit();
        this.getUserSubscription();
    }

    /**
     * TODO
     * Called when an item selected.
     * @param $event
     */
    public onSelect($event: any[]) {
    }

    /**
     * Init the list and his graphical component.
     */
    private initList(): void {
        this.data = this.formatData();
        this.tableColumns = this.tableFactory.getColumns([
            '#Group', 'Date'
        ], [
            'groupName', 'date'
        ]);
        this.tableOptions = this.tableFactory.getOptions(false, true, false, true, [10, 1, 5, 25], false, false, false);
    }

    /**
     * Get the user subscriptions.
     *
     * If success call getGroups method.
     */
    private getUserSubscription(): void {
        this.isAPIRequestFinalized = false;
        this.data = undefined;
        this.logger.debug(this, 'Retrieving user subscriptions.');
        this.subscriptionService.getSubscriptionsByUserId(this.sessionService.localUser).subscribe(value => {
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

    /**
     * Retrieve the groups from the API.
     *
     * If success call refreshList method.
     */
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

    /**
     * Format the data
     */
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

    /**
     * Refers to {@link RefreshableListComponent}
     * @param element
     */
    protected addElement(element: FormattedSubscription | number): void {
        if (this.userSubscriptions) {
            this.data.push((isNumber(element) ? this.convertToElement(element as number) : element as FormattedSubscription));
            this.refreshList(this.data);
        }
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param element
     */
    protected removeElement(element: FormattedSubscription | number): void {
        if (this.userSubscriptions) {
            this.data.splice(this.findIndex((isNumber(element) ? element as number : this.convertToId(element as FormattedSubscription))), 1);
            this.refreshList(this.data);
        }
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param groupId
     */
    protected convertToElement(groupId: number): FormattedSubscription {
        let sub: FormattedSubscription = null;
        this.userSubscriptions.forEach(value => {
            if (value.groupId === groupId) {
                sub = this.formatData([value])[0];
            }
        });
        return undefined;
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param element
     */
    protected convertToId(element: FormattedSubscription): number {
        return element.groupId;
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param newList
     */
    protected refreshList(newList?: FormattedSubscription[]): void {
        if (newList) {
            this.data = newList;
            this.onRefresh.emit(newList);
        } else {
            this.getUserSubscription();
        }
    }

    /**
     * Find index of a group in the local groups list by specifying his ID.
     * @param groupId The group ID.
     * @return number The index.
     */
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
