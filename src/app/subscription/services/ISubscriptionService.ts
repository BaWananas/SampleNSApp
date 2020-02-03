import {Observable} from 'rxjs';
import {Subscription} from '@src/app/subscription/models/Subscription';
import {CollectionModel} from '@src/app/shared/models/HttpResponse/CollectionModel';

export interface ISubscriptionService {

    getAllSubscriptions(): Observable<CollectionModel<Subscription>>;
    getSubscriptionById(id: number): Observable<Subscription>;
    getSubscriptionsByUserId(id: number): Observable<CollectionModel<Subscription>>;
    getSubscriptionsByGroupId(id: number): Observable<CollectionModel<Subscription>>;
    subscribe(groupId: number, userId: number): Observable<Subscription>;
    unsubscribe(id: number): Observable<boolean>;
}
