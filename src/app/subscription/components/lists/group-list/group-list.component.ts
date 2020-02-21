import {Component, EventEmitter, OnInit} from '@angular/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {HttpErrorResponse} from '@angular/common/http';
import {ITableColumn, ITableFactory, ITableOptions, TableFactoryService} from '@arhs/ui';
import {
    CollectionModel,
    Group,
    GroupService,
    HttpError,
    HttpErrorService,
    IGroupService,
    IHttpErrorService,
    ISubscriptionService,
    Subscription,
    SubscriptionService
} from '@arhs/core';

@Component({
    selector: 'app-groups-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

    // Services
    private groupService: IGroupService;
    private subscriptionService: ISubscriptionService;
    private errorService: IHttpErrorService;
    private loggerService: ILoggerService;
    private tableFactory: ITableFactory;

    groups: Group[] = undefined;
    error: HttpError;
    userId = 0;
    userSubscriptions: Subscription[] = [];

    /**
     * Required vars for library table test.
     */
    refreshEvent: EventEmitter<Group[]> = new EventEmitter<[]>();
    tableOptions: ITableOptions<Group> = null;
    tableColumns: ITableColumn[] = null;
    selectedItems: Group[] = [];

    constructor(groupService: GroupService,
                loggerService: LoggerService,
                errorService: HttpErrorService,
                subscriptionService: SubscriptionService,
                tableFactory: TableFactoryService) {
        this.groupService = groupService;
        this.loggerService = loggerService;
        this.errorService = errorService;
        this.subscriptionService = subscriptionService;
        this.tableFactory = tableFactory;
        this.initTable();
    }

    ngOnInit() {
        this.getGroups();
        this.getUserSubscriptions();
    }

    public getGroups() {
        this.groups = undefined;
        this.error = null;
        this.loggerService.info(this, 'Retrieving groups.');

        this.groupService.getAllGroups().subscribe((value: CollectionModel<Group>) => {
            if (value._embedded) {
                this.groups = value._embedded.items;
            } else {
                this.groups = [];
            }
            this.refreshTable(this.groups);
        }, (error: HttpErrorResponse) => {
            this.loggerService.error(this, 'Error during retrieving groups from API. Error: ' + JSON.stringify(error));
            this.error = this.errorService.handleError(error);
        });
    }

    public getUserSubscriptions(): void {
        this.error = null;
        this.userSubscriptions = [];
        this.loggerService.info(this, 'Retrieving user subscriptions.');

        this.subscriptionService.getSubscriptionsByUserId(this.userId).subscribe(value => {
            if (value._embedded) {
                this.userSubscriptions = value._embedded.items;
            } else {
                this.userSubscriptions = [];
            }
        }, error => {
            this.loggerService.error(this, 'Error during retrieving user subscriptions from API. Error: ' + JSON.stringify(error));
            this.error = error;
        });
    }

    public onSelectedItem(items: Group[]): void {
        if (items) {
            this.selectedItems = items;
        }
    }

    private initTable(): void {
        this.tableOptions = this.tableFactory.getOptions<Group>(false, true, false, true, [10, 1, 5, 25], true, true, true);
        this.tableColumns = this.tableFactory.getColumns([
            '#ID', 'Name', 'Description'
        ], [
            'id', 'name', 'description'
        ]);
    }

    private refreshTable(newElement: Group[]): void {
        this.refreshEvent.emit(newElement);
    }
}
