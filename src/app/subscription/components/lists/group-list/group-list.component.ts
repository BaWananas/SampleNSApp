import {Component, EventEmitter, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {HttpErrorResponse} from '@angular/common/http';
import {ITableColumn, ITableFactory, ITableOptions, TableFactoryService} from '@arhs/ui';
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
import {IAuthenticationService} from '@src/app/authentication/services/IAuthenticationService';
import {AuthenticationService} from '@src/app/authentication/services/implementations/authentication.service';
import {RefreshableListComponent} from '@src/app/shared/models/RefreshableListComponent';
import {isNumber} from 'util';
import {IFeedbackService} from '@src/app/feedback/services/IFeedbackService';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {ISessionService} from '@src/app/shared/services/ISessionService';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';

@Component({
    selector: 'app-groups-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent extends RefreshableListComponent<Group, number> implements OnInit, OnDestroy {

    @Input() elementDetails: TemplateRef<any>;
    @Input() onlyIfSubscribed = undefined;

    // Services
    private groupService: IGroupService;
    private subscriptionService: ISubscriptionService;
    private errorService: IHttpErrorService;
    private loggerService: ILoggerService;
    private tableFactory: ITableFactory;
    private feedbackService: IFeedbackService;
    private sessionService: ISessionService;

    groups: Group[] = undefined;
    userSubscriptions: Subscription[] = [];

    /* Required vars for library table test. */
    refreshEvent: EventEmitter<Group[]> = new EventEmitter<[]>();
    tableOptions: ITableOptions<Group> = null;
    tableColumns: ITableColumn[] = null;
    selectedItems: Group[] = [];

    /* API requests states (for waiting components) */
    isAPIRequestFinalized = false;

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

    ngOnInit(): void {
        super.ngOnInit();
        this.getGroups();
    }

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

    public getUserSubscriptions(): void {
        this.isAPIRequestFinalized = false;
        this.userSubscriptions = [];
        this.loggerService.debug(this, 'Retrieving user subscriptions.');

        this.subscriptionService.getSubscriptionsByUserId(this.sessionService.user).subscribe(value => {
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

    // TODO
    public onSelectedItem(items: Group[]): void {
        if (items) {
            this.selectedItems = items;
        }
    }

    private initList(): void {
        this.tableOptions = this.tableFactory.getOptions<Group>(false, true, false, true, [10, 1, 5, 25], true, false, false);
        this.tableColumns = this.tableFactory.getColumns([
            '#ID', 'Name', 'Description'
        ], [
            'id', 'name', 'description'
        ]);
    }

    protected refreshList(newElement?: Group[]): void {
        if (newElement) {
            this.formatData();
            this.refreshEvent.emit(newElement);
        } else {
            this.getGroups();
        }
    }

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

    protected removeElement(group: Group | number): void {
        if (this.groups) {
            this.groups.splice(this.findIndex(isNumber(group) ? group as number : this.convertToId(group as Group)), 1);
            this.refreshList(this.groups);
        }
    }

    protected addElement(group: Group | number): void {
        if (this.groups) {
            this.groups.push((isNumber(group) ? this.convertToElement(group as number) : group as Group));
            this.refreshList(this.groups);
        }
    }

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

    protected convertToId(element: Group): number {
        return element.id;
    }

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
