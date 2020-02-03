import {Injectable} from '@angular/core';
import {IGroupService} from '@src/app/subscription/services/IGroupService';
import {Group} from '@src/app/subscription/models/Group';
import {HttpService} from '@src/app/shared/services/implementations/http.service';
import {Observable} from 'rxjs';
import {CollectionModel} from '@src/app/shared/models/HttpResponse/CollectionModel';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {

  public static resourcePath = 'groups';

  constructor(private http: HttpService) {}

  createGroup(name: string, assoId: number, description?: string): Observable<Group> {
    return this.http.post<Group>(GroupService.resourcePath, new Group(assoId, name, description).toJson());
  }

  deleteGroup(id: number): Observable<boolean> {
    return this.http.delete<boolean>(GroupService.resourcePath + '/' + id);
  }

  getAllGroups(): Observable<CollectionModel<Group>> {
    return this.http.get<CollectionModel<Group>>(GroupService.resourcePath);
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(GroupService.resourcePath + '/' + id);
  }

  // TODO
  getGroupByName(name: string): Observable<Group> {
    return this.http.get<Group>(GroupService.resourcePath + '/' + name);
  }
}
