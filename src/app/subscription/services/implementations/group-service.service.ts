import {Injectable} from '@angular/core';
import {IGroupService} from '@src/app/subscription/services/IGroupService';
import {Group} from '@src/app/subscription/models/Group';
import {HttpServiceService} from '@src/app/shared/services/implementations/http-service.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService implements IGroupService {

  private resourcePath = 'groups';

  constructor(private http: HttpServiceService) {}

  createGroup(name: string, assoId: number, description?: string): Observable<Group> {
    return this.http.post<Group>(this.resourcePath, new Group(assoId, name, description));
  }

  deleteGroup(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.resourcePath + id);
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.resourcePath);
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(this.resourcePath);
  }

  getGroupByName(name: string): Observable<Group> {
    return this.http.get<Group>(this.resourcePath);
  }
}
