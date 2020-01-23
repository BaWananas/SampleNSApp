import {Group} from '@src/app/subscription/models/Group';
import {Observable} from 'rxjs';

export interface IGroupService {

    getAllGroups(): Observable<Group[]>;
    getGroupById(id: number): Observable<Group>;
    getGroupByName(name: String): Observable<Group>;
    createGroup(name: String, assoId: number, description?: String): Observable<Group>;
    deleteGroup(id: number): Observable<boolean>;
}
