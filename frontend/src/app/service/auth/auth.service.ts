import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import {URL_JSON} from '../../utils/url_json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    public http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>((jwt_decode(localStorage.getItem('previmo_user'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login = (email: string, password: string) => {
    return this.http.post<any>(`${URL_JSON.AUTH}/login`, {email, password})
      .pipe(map((res: any) => {
        if (res) {
          localStorage.setItem('previmo_user', res.token);
          this.currentUserSubject.next(jwt_decode(res.token));
        }
        return jwt_decode(res.token);
      }));
  }

  register = (userData) => {
    return this.http.post<any>(`${URL_JSON.AUTH}/register`, userData)
      .pipe(map(response => {
        return response;
      }));
  }

  logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
