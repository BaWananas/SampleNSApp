import {Component, EventEmitter, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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
import { Page } from 'tns-core-modules/ui/page/page';

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
                tableFactory: TableFactoryService,
                page: Page) {
        this.groupService = groupService;
        this.loggerService = loggerService;
        this.errorService = errorService;
        this.subscriptionService = subscriptionService;
        this.tableFactory = tableFactory;
        page.actionBarHidden = true;
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

    public getSubscriptionId(groupId: number): number {
        let id = -1;
        this.userSubscriptions.forEach(value => {
            if (value.groupId === groupId) {
                id = value.id;
                return;
            }
        });
        return id;
    }

    public deleteGroup(id: any, index: number) {
        this.error = null;
        this.loggerService.info(this, 'Delete group ' + id + '.');

        this.groupService.deleteGroup(id).subscribe(value => {
            if (index >= 0) {
                this.groups.splice(index, 1);
                this.refreshTable(this.groups);
            }
        }, (error: HttpErrorResponse) => {
            this.loggerService.error(this, 'Error during deleting group ' + id + '. Error: ' + JSON.stringify(error));
            this.error = this.errorService.handleError(error);
        });
    }

    public createGroup(group: Group) {
        this.error = null;
        this.loggerService.info(this, 'Create group.');

        this.groupService.createGroup(group.name, group.associationId, group.description).subscribe(value => {
            this.groups.push(value);
            this.refreshTable(this.groups);
        }, (error: HttpErrorResponse) => {
            this.loggerService.error(this, 'Error during creating group. Error: ' + JSON.stringify(error));
            this.error = this.errorService.handleError(error);
        });
    }

    public subscribe(groupId: number): void {
        this.error = null;
        this.loggerService.info(this, 'Subscribe to group ' + groupId + '.');

        this.subscriptionService.subscribe(groupId, this.userId).subscribe(value => {
            this.userSubscriptions.push(value);
        }, error => {
            this.loggerService.error(this, 'Error during subscribing group ' + groupId + '. Error: ' + JSON.stringify(error));
            this.error = error;
        });
    }

    public unsubscribe(index: number, groupId: number): void {
        const id = this.getSubscriptionId(groupId);
        if (id >= 0) {
            this.error = null;
            this.loggerService.info(this, 'Unsubscribe to group ' + groupId + '.');

            this.subscriptionService.unsubscribe(id).subscribe(value => {
                if (index >= 0) {
                    this.userSubscriptions.splice(index, 1);
                }
            }, error => {
                this.loggerService.error(this, 'Error during unsubscription to group ' + groupId + '. Error: ' + JSON.stringify(error));
                this.error = error;
            });
        }
    }

    public isSubscribed(groupId: number): boolean {
        let isSubscribed = false;
        this.userSubscriptions.forEach(value => {
            if (value.groupId === groupId) {
                isSubscribed = true;
                return;
            }
        });
        return isSubscribed;
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
