import {Component, OnInit} from '@angular/core';
import {Group} from '@src/app/subscription/models/Group';
import {GroupService} from '@src/app/subscription/services/implementations/group.service';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';
import {HttpErrorResponse} from '@angular/common/http';
import {CollectionModel} from '@src/app/shared/models/HttpResponse/CollectionModel';
import {IHttpErrorService} from '@src/app/shared/services/IHttpErrorService';
import {HttpError} from '@src/app/shared/models/HttpError/HttpError';
import {HttpErrorService} from '@src/app/shared/services/implementations/http-error.service';
import {IGroupService} from '@src/app/subscription/services/IGroupService';
import {ISubscriptionService} from '@src/app/subscription/services/ISubscriptionService';
import {SubscriptionService} from '@src/app/subscription/services/implementations/subscription.service';
import {Subscription} from '@src/app/subscription/models/Subscription';

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

    groups: Group[] = undefined;
    error: HttpError;
    userId = 0;
    userSubscriptions: Subscription[] = [];

    constructor(groupService: GroupService,
                loggerService: LoggerService,
                errorService: HttpErrorService,
                subscriptionService: SubscriptionService) {
        this.groupService = groupService;
        this.loggerService = loggerService;
        this.errorService = errorService;
        this.subscriptionService = subscriptionService;
    }

    ngOnInit() {
        this.getGroups();
        this.getUserSubscriptions();
    }

    private getGroups() {
        this.groups = undefined;
        this.error = null;
        this.loggerService.info(this, 'Retrieving groups.');

        this.groupService.getAllGroups().subscribe((value: CollectionModel<Group>) => {
            if (value._embedded) {
                this.groups = value._embedded.items;
            } else {
                this.groups = [];
            }
        }, (error: HttpErrorResponse) => {
            this.loggerService.error(this, 'Error during retrieving groups from API. Error: ' + JSON.stringify(error));
            this.error = this.errorService.handleError(error);
        });
    }

    getUserSubscriptions(): void {
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

    private deleteGroup(id: any, index: number) {
        this.error = null;
        this.loggerService.info(this, 'Delete group ' + id + '.');

        this.groupService.deleteGroup(id).subscribe(value => {
            if (index >= 0) {
                this.groups.splice(index, 1);
            }
        }, (error: HttpErrorResponse) => {
            this.loggerService.error(this, 'Error during deleting group ' + id + '. Error: ' + JSON.stringify(error));
            this.error = this.errorService.handleError(error);
        });
    }

    createGroup(group: Group) {
        this.error = null;
        this.loggerService.info(this, 'Create group.');

        this.groupService.createGroup(group.name, group.associationId, group.description).subscribe(value => {
            this.groups.push(value);
        }, (error: HttpErrorResponse) => {
            this.loggerService.error(this, 'Error during creating group. Error: ' + JSON.stringify(error));
            this.error = this.errorService.handleError(error);
        });
    }

    private subscribe(groupId: number): void {
        this.error = null;
        this.loggerService.info(this, 'Subscribe to group ' + groupId + '.');

        this.subscriptionService.subscribe(groupId, this.userId).subscribe(value => {
            this.userSubscriptions.push(value);
        }, error => {
            this.loggerService.error(this, 'Error during subscribing group ' + groupId + '. Error: ' + JSON.stringify(error));
            this.error = error;
        });
    }

    private unsubscribe(index: number, groupId: number): void {
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

    private isSubscribed(groupId: number): boolean {
        let isSubscribed = false;
        this.userSubscriptions.forEach(value => {
            if (value.groupId === groupId) {
                isSubscribed = true;
                return;
            }
        });
        return isSubscribed;
    }

    private getSubscriptionId(groupId: number): number {
        let id = -1;
        this.userSubscriptions.forEach(value => {
            if (value.groupId === groupId) {
                id = value.id;
                return;
            }
        });
        return id;
    }

    onButtonTap(): void {
        console.log('Button was pressed');
    }
}
