import { Injectable } from '@angular/core';
import {ISubscriptionService} from '@src/app/subscription/services/ISubscriptionService';
import {Observable} from 'rxjs';
import {Subscription} from '@src/app/subscription/models/Subscription';
import {HttpService} from '@src/app/shared/services/implementations/http.service';
import {Group} from '@src/app/subscription/models/Group';
import {GroupService} from '@src/app/subscription/services/implementations/group.service';
import {CollectionModel} from '@src/app/shared/models/HttpResponse/CollectionModel';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService implements ISubscriptionService{

  public static resourcePath = 'subscriptions';

  constructor(private http: HttpService) { }

  getAllSubscriptions(): Observable<CollectionModel<Subscription>> {
    return this.http.get<CollectionModel<Subscription>>(SubscriptionService.resourcePath);
  }

  getSubscriptionById(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(SubscriptionService.resourcePath + '/' + id);
  }

  getSubscriptionsByGroupId(id: number): Observable<CollectionModel<Subscription>> {
    return this.http.get<CollectionModel<Subscription>>(GroupService.resourcePath + '/' + id + '/subscriptions');
  }

  getSubscriptionsByUserId(id: number): Observable<CollectionModel<Subscription>> {
    return this.http.get<CollectionModel<Subscription>>(SubscriptionService.resourcePath + '/search/byuserid/' + id);
  }

  subscribe(groupId: number, userId: number): Observable<Subscription> {
    return this.http.post<Subscription>(SubscriptionService.resourcePath, new Subscription(groupId, userId).toJson());
  }

  unsubscribe(id: number): Observable<boolean> {
    return this.http.delete<boolean>(SubscriptionService.resourcePath + '/' + id);
  }
}
