import {GroupListComponent} from '@src/app/subscription/components/lists/group-list/group-list.component';
import {TestBed} from '@angular/core/testing';
import {Group, GroupService, HttpErrorService, Subscription, SubscriptionService} from '@arhs/core';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {TableFactoryService} from '@arhs/ui';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {AppModule} from '@src/app/root/app.module';

describe('GroupList component', function () {
    let component: GroupListComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GroupListComponent,
                GroupService,
                LoggerService,
                HttpErrorService,
                SubscriptionService,
                TableFactoryService,
                FeedbackService,
                SessionService
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(GroupListComponent);
    });

    describe('initList method', function () {
        it('should init UI list component', function () {
            component['initList']();
            expect(component.tableOptions).toBeDefined();
            expect(component.tableColumns).toBeDefined();
        });
    });

    describe('refreshingList method', function () {
        it('should emit event for refreshing list', done => {
            const groups: Group[] = [];
            component.refreshEvent.subscribe(() => {
                done();
                expect(true).toBe(true);
            });
            component['refreshList'](groups);
        });
    });

    describe('formatData method', function () {
        beforeEach(() => {
            const groups: Group[] = [
                new Group(0, '1', '', 1),
                new Group(0, '2', '', 2),
                new Group(0, '3', '', 3),
            ];
            const subscriptions: Subscription[] = [
                new Subscription(1, 0, 0),
            ];
            component.groups = groups;
            component.userSubscriptions = subscriptions;
        });

        it('should keep all groups', function () {
            component.onlyIfSubscribed = undefined;
            component['formatData']();
            expect(component.groups.length).toBe(3);
        });

        it('should keep only subscribed groups', function () {
            component.onlyIfSubscribed = true;
            component['formatData']();
            expect(component.groups.length).toBe(1);
        });

        it('should keep only not subscribed groups', function () {
            component.onlyIfSubscribed = false;
            component['formatData']();
            expect(component.groups.length).toBe(2);
        });
    });

    describe('removeElement method', function () {
        it('should remove an element', function () {
            component.groups = [];
            component.groups.push(new Group(0, '', '', 0));
            component['removeElement'](0);
            expect(component.groups.length).toBe(0);
        });
    });

    describe('addElement method', function () {
        it('should add an element', function () {
            component.groups = [];
            component['addElement'](new Group(0, '', '', 0));
            component['addElement'](new Group(0, '', '', 1));
            expect(component.groups.length).toBe(2);
        });
    });

    describe('convertToElement method', function () {
        it('should convert existing element', function () {
            component.groups = [];
            component['addElement'](new Group(0, 'Test', '', 0));
            expect(component['convertToElement'](0).name).toEqual('Test');
        });

        it('should return null if element was not found', function () {
            component.groups = [];
            expect(component['convertToElement'](5)).toBeNull();
        });
    });

    describe('convertToId method', function () {
        it('should return valid id', function () {
            expect(component['convertToId'](new Group(0, '', '', 0))).toBe(0);
        });

        it('should return -1 if element was not found', function () {
            expect(component['convertToId'](null)).toBe(-1);
        });
    });

    describe('findIndex method', function () {
        it('should return valid index', function () {
            component.groups = [new Group(0, '', '', 0)];
            expect(component['findIndex'](0)).toBe(0);
        });

        it('should return -1 if element was not found', function () {
            expect(component['findIndex'](0)).toBe(-1);
        });
    });

});
