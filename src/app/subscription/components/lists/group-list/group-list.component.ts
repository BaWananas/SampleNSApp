import {Component, EventEmitter, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {HttpErrorResponse} from '@angular/common/http';
import {ITableColumn, ITableFactory, ITableOptions, ITableStyles, TableFactoryService, TableStyles} from '@arhs/ui';
import {
    CollectionModel,
    Group,
    GroupService,
    HttpErrorService,
    IGroupService,
    IHttpErrorService,
    ISubscriptionService,
    Subscription,
    SubscriptionService
} from '@arhs/core';
import {RefreshableListComponent} from '@src/app/shared/models/RefreshableListComponent';
import {isNumber} from 'util';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

/**
 * Group list component for both web and mobile platforms.
 */
@Component({
    selector: 'app-groups-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent extends RefreshableListComponent<Group, number> implements OnInit, OnDestroy {

    /**
     * Optional detail that complete each element.
     */
    @Input() elementDetails: TemplateRef<any>;
    /**
     * Boolean value: if true only groups that user was subscribed to will be showed,
     * if false only groups that user wasn't subscribed to will be showed and
     * if undefined, all the groups will be showed
     */
    @Input() onlyIfSubscribed: boolean = undefined;

    // Services
    /**
     * @ignore
     */
    private groupService: IGroupService;
    /**
     * @ignore
     */
    private subscriptionService: ISubscriptionService;
    /**
     * @ignore
     */
    private errorService: IHttpErrorService;
    /**
     * @ignore
     */
    private loggerService: ILoggerService;
    /**
     * @ignore
     */
    private tableFactory: ITableFactory;
    /**
     * @ignore
     */
    private feedbackService: IFeedbackService;
    /**
     * @ignore
     */
    private sessionService: ISessionService;

    /**
     * The groups list.
     */
    groups: Group[] = undefined;
    /**
     * The user subscriptions list.
     */
    userSubscriptions: Subscription[] = [];

    // Required vars for library table test.
    /**
     * Event triggered for refreshing the graphical component.
     */
    refreshEvent: EventEmitter<Group[]> = new EventEmitter<[]>();
    /**
     * Option for the graphical component.
     */
    tableOptions: ITableOptions<Group> = null;
    /**
     * Columns for the graphical component.
     */
    tableColumns: ITableColumn[] = null;
    /**
     * The current selected items.
     */
    selectedItems: Group[] = [];
    /**
     * Table custom styles.
     */
    styles: ITableStyles = null;

    /**
     * API requests states (for waiting components)
     */
    isAPIRequestFinalized = false;

    /**
     * Constructor.
     * @param groupService Refers to {@link IGroupService}
     * @param loggerService Refers to {@link ILoggerService}
     * @param errorService Refers to {@link IHttpErrorService}
     * @param subscriptionService Refers to {@link ISubscriptionService}
     * @param tableFactory Refers to {@link ITableFactory}
     * @param feedbackService Refers to {@link IFeedbackService}
     * @param sessionService Refers to {@link ISessionService}
     */
    constructor(groupService: GroupService,
                loggerService: LoggerService,
                errorService: HttpErrorService,
                subscriptionService: SubscriptionService,
                tableFactory: TableFactoryService,
                feedbackService: FeedbackService,
                sessionService: SessionService) {
        super();
        this.groupService = groupService;
        this.loggerService = loggerService;
        this.errorService = errorService;
        this.subscriptionService = subscriptionService;
        this.tableFactory = tableFactory;
        this.feedbackService = feedbackService;
        this.sessionService = sessionService;
        this.initList();
    }

    /**
     * Refers to {@link OnInit}
     *
     * Call the getGroups method.
     */
    ngOnInit(): void {
        super.ngOnInit();
        this.getGroups();
    }

    /**
     * Retrieve the groups from the API.
     *
     * If success, get the user subscriptions.
     */
    public getGroups() {
        this.isAPIRequestFinalized = false;
        this.groups = undefined;
        this.loggerService.debug(this, 'Retrieving groups.');

        this.groupService.getAllGroups().subscribe((value: CollectionModel<Group>) => {
            if (value._embedded) {
                this.groups = value._embedded.items;
            } else {
                this.groups = [];
            }
            this.getUserSubscriptions();
        }, (error: HttpErrorResponse) => {
            const formattedError = this.errorService.handleError(error);
            this.loggerService.error(this, 'Error during retrieving groups from API. Error: ' + formattedError);
            this.feedbackService.notifyError(formattedError);
            this.isAPIRequestFinalized = true;
        });
    }

    /**
     * Get the user subscriptions.
     *
     * If success call refreshList method.
     */
    public getUserSubscriptions(): void {
        this.isAPIRequestFinalized = false;
        this.userSubscriptions = [];
        this.loggerService.debug(this, 'Retrieving user subscriptions.');

        this.subscriptionService.getSubscriptionsByUserId(this.sessionService.localUser).subscribe(value => {
            if (value._embedded) {
                this.userSubscriptions = value._embedded.items;
            } else {
                this.userSubscriptions = [];
            }
            this.refreshList(this.groups);
        }, error => {
            const formattedError = this.errorService.handleError(error);
            this.loggerService.error(this, 'Error during retrieving user subscriptions from API. Error: ' + formattedError);
            this.feedbackService.notifyError(formattedError);
            this.isAPIRequestFinalized = true;
        }, () => {
            this.isAPIRequestFinalized = true;
        });
    }

    /**
     * TODO
     * Called when an item selected.
     * @param items
     */
    public onSelectedItem(items: Group[]): void {
        if (items) {
            this.selectedItems = items;
        }
    }

    /**
     * Init the list and his graphical component.
     */
    private initList(): void {
        this.tableOptions = this.tableFactory.getOptions<Group>({
            filtering: true,
            stickyHeader: true,
            sorting: true,
            pagination: true,
            paginationSorting: [10, 5 , 1, 25],
        });
        this.tableColumns = this.tableFactory.getColumns([
            '#ID', 'Name', 'Description'
        ], [
            'id', 'name', 'description'
        ]);
        this.styles = this.tableFactory.getStyles({
            filterContainer: ['bg-white', 'dark'],
            headerText: ['dark'],
            rowText: ['dark']
        });
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param newElement
     */
    protected refreshList(newElement?: Group[]): void {
        if (newElement) {
            this.formatData();
            this.refreshEvent.emit(newElement);
        } else {
            this.getGroups();
        }
    }

    /**
     * Format the data
     */
    private formatData(): void {
        if (this.onlyIfSubscribed !== undefined) {
            const groups: Group[] = [];
            const subscriptionIds: number[] = [];

            this.userSubscriptions.forEach(value => {
                subscriptionIds.push(value.groupId);
            });

            if (this.onlyIfSubscribed) {
                this.groups.forEach(value => {
                    if (subscriptionIds.includes(value.id)) {
                        groups.push(value);
                    }
                });
            } else if (!this.onlyIfSubscribed) {
                this.groups.forEach(value => {
                    if (!subscriptionIds.includes(value.id)) {
                        groups.push(value);
                    }
                });
            }

            this.groups = groups;
        }
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param group
     */
    protected removeElement(group: Group | number): void {
        if (this.groups) {
            this.groups.splice(this.findIndex(isNumber(group) ? group as number : this.convertToId(group as Group)), 1);
            this.refreshList(this.groups);
        }
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param group
     */
    protected addElement(group: Group | number): void {
        if (this.groups) {
            this.groups.push((isNumber(group) ? this.convertToElement(group as number) : group as Group));
            this.refreshList(this.groups);
        }
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param id
     */
    protected convertToElement(id: number): Group {
        let group: Group = null;
        this.groups.forEach(value => {
            if (value.id === id) {
                group = value;
                return;
            }
        });
        return undefined;
    }

    /**
     * Refers to {@link RefreshableListComponent}
     * @param element
     */
    protected convertToId(element: Group): number {
        return element.id;
    }

    /**
     * Find index of a group in the local groups list by specifying his ID.
     * @param id  The group ID.
     * @return number The index.
     */
    private findIndex(id: number): number {
        let index = -1;
        this.groups.forEach((value, i) => {
            if (value.id === id) {
                index = i;
                return;
            }
        });
        return index;
    }
}
