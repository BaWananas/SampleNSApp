import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IHttpService {
    rootUrl: string;
    headers: HttpHeaders;

    auth<T>(): Observable<T>;
    get<T>(resource: string): Observable<T>;
    post<T>(resource: string, body: any): Observable<T>;
    put<T>(resource: string, body: any): Observable<T>;
    delete<T>(resource: string): Observable<T>;
}
