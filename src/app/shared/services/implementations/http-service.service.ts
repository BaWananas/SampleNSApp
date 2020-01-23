import { Injectable } from '@angular/core';
import {IHttpService} from '@src/app/shared/services/IHttpService';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {observable, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService implements IHttpService {

  constructor(private httpClient: HttpClient) {}

  token: string = null;
  authPath = 'authenticate/';
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  });
  rootUrl = 'http://localhost:8080/';

  delete<T>(resource: string): Observable<T> {
    return this.httpClient.delete<T>(this.rootUrl.concat(resource), {headers: this.headers});
  }

  get<T>(resource: string): Observable<T> {
    return this.httpClient.get<T>(this.rootUrl.concat(resource), {headers: this.headers});
  }

  post<T>(resource: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.rootUrl.concat(resource), body, {headers: this.headers});
  }

  put<T>(resource: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.rootUrl.concat(resource), body, {headers: this.headers});
  }

  auth<T>(): Observable<T> {
    let obs: Observable<T>;
    obs = this.get<T>(this.authPath);

    obs.subscribe(value => {
      console.log(JSON.stringify(value));
    }, error => {
      this.token = null;
    });

    return obs;
  }
}
