import {UserSubscriptionsListComponent} from '@src/app/subscription/components/lists/user-subscriptions-list/user-subscriptions-list.component';
import {TestBed} from '@angular/core/testing';
import {AppModule} from '@src/app/root/app.module';
import {Group, GroupService, HttpErrorService, Subscription, SubscriptionService} from '@arhs/core';
import {TableFactoryService} from '@arhs/ui';
import {LoggerService} from '@src/app/shared/services/implementations/logger.service';
import {FeedbackService} from '@src/app/feedback/services/implementations/feedback.service';
import {SessionService} from '@src/app/shared/services/implementations/sessionService/session.service';
import {FormattedSubscription} from '@src/app/subscription/models/FormattedSubscription';

describe('UserSubscriptionsList component', function () {
    let component: UserSubscriptionsListComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserSubscriptionsListComponent,
                SubscriptionService,
                TableFactoryService,
                LoggerService,
                HttpErrorService,
                GroupService,
                FeedbackService,
                SessionService
            ],
            imports: [
                AppModule
            ]
        });
        component = TestBed.get(UserSubscriptionsListComponent);
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
            const subscriptions: FormattedSubscription[] = [];
            component.onRefresh.subscribe(() => {
                done();
                expect(true).toBe(true);
            });
            component['refreshList'](subscriptions);
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

        it('should return formatted subscriptions', function () {
            expect(component['formatData']().length).toBe(1);
        });

        it('should return formatted subscriptions with specified initial subscriptions', function () {
            expect(component['formatData']([]).length).toBe(0);
            expect(component['formatData']([new Subscription(4, 1, 0)]).length).toBe(1);
        });
    });

    describe('removeElement method', function () {
        it('should remove an element', function () {
            component.data = [new FormattedSubscription('', null, 1, 1, 1)];
            component['removeElement'](1);
            expect(component.data.length).toBe(0);
        });
    });

    describe('addElement method', function () {
        it('should add an element', function () {
            component.data = [];
            component['addElement'](new FormattedSubscription('', null, 1, 1, 1));
            expect(component.data.length).toBe(1);
        });
    });

    describe('convertToElement method', function () {
        it('should convert existing element', function () {
            component.userSubscriptions = [new Subscription(1, 1, 1)];
            component.groups = [new Group(1, 'Test', '', 1)];
            expect(component['convertToElement'](1).groupName).toEqual('Test');
        });

        it('should return null if element was not found', function () {
            component.data = [];
            expect(component['convertToElement'](5)).toBeNull();
        });
    });

    describe('convertToId method', function () {
        it('should return valid id', function () {
            expect(component['convertToId'](new FormattedSubscription('', null, 1, 1, 1))).toBe(1);
        });

        it('should return -1 if element was not found', function () {
            expect(component['convertToId'](null)).toBe(-1);
        });
    });

    describe('findIndex method', function () {
        it('should return valid index', function () {
            component.data = [new FormattedSubscription('', null, 1, 1, 1)];
            expect(component['findIndex'](1)).toBe(0);
        });

        it('should return -1 if element was not found', function () {
            expect(component['findIndex'](0)).toBe(-1);
        });
    });
});
