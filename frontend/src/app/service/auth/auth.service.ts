import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import {URL_JSON} from '../../utils/url_json';
import {SocketService} from '../socket/socket.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public showExpireAlertSubject: BehaviorSubject<boolean>;
  public showExpireAlert: Observable<boolean>;
  public decodeToken: any;
  public interval;
  public loginInterval;
  public resetInterval;

  constructor(
    public http: HttpClient,
    public router: Router,
    public socketService: SocketService
  ) {
    this.showExpireAlertSubject = new BehaviorSubject<boolean>(false);
    this.showExpireAlert = this.showExpireAlertSubject.asObservable();
    const token = localStorage.getItem('previmo_user');
    if (token) {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.interval = setInterval(this.checkSessionTime, 1000);
    }
    this.currentUserSubject = new BehaviorSubject<any>(token ? jwt_decode(token) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login = (email: string, password: string) => {
    this.clearIntervals();
    this.showExpireAlertSubject.next(false);
    return this.http.post<any>(`${URL_JSON.AUTH}/login`, {email, password})
      .pipe(map((res: any) => {
        if (res) {
          if (res.token) {
            localStorage.setItem('previmo_user', res.token);
            this.currentUserSubject.next(jwt_decode(res.token));
            if (this.loginInterval) {
              clearInterval(this.loginInterval);
              this.loginInterval = null;
            }
            this.loginInterval = setInterval(this.checkSessionTime, 1000);
          } else {
            return res;
          }
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
    this.clearIntervals();
    this.socketService.closeEmit();
    localStorage.removeItem('previmo_user');
    this.currentUserSubject.next(null);
    this.showExpireAlertSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  checkSessionTime = () => {
    const now = new Date();
    const currentSecond = Math.ceil(now.getTime() / 1000);
    if (this.currentUserValue.exp - currentSecond < 30) {
      if (!this.showExpireAlertSubject.value) {
        this.showExpireAlertSubject.next(true);
      }
      this.clearIntervals();
    }
  }

  clearIntervals = () => {
    clearInterval(this.interval);
    clearInterval(this.loginInterval);
    clearInterval(this.resetInterval);
    this.interval = null;
    this.loginInterval = null;
    this.resetInterval = null;
  }

  resetSessionTime = () => {
    const token = localStorage.getItem('previmo_user');
    this.http.post<any>(`${URL_JSON.AUTH}/resetToken`, {token, email: this.currentUserValue.email}).subscribe(res => {
      if (res) {
        localStorage.setItem('previmo_user', res.token);
        this.currentUserSubject.next(jwt_decode(res.token));
        if (this.resetInterval) {
          clearInterval(this.resetInterval);
          this.resetInterval = null;
        }
        this.resetInterval = setInterval(this.checkSessionTime, 1000);
      }
    });
  }

  verifyCode = (data) => {
    this.clearIntervals();
    this.showExpireAlertSubject.next(false);
    return this.http.post<any>(`${URL_JSON.AUTH}/verify_code`, {data}).pipe(map(res => {
      if (res) {
        localStorage.setItem('previmo_user', res.token);
        this.currentUserSubject.next(jwt_decode(res.token));
        if (this.loginInterval) {
          clearInterval(this.loginInterval);
          this.loginInterval = null;
        }
        this.loginInterval = setInterval(this.checkSessionTime, 1000);
      }
      return jwt_decode(res.token);
    }));
  }

  resetToken = token => {
    this.clearIntervals();
    this.showExpireAlertSubject.next(false);
    localStorage.setItem('previmo_user', token);
    this.currentUserSubject.next(jwt_decode(token));
    if (this.loginInterval) {
      clearInterval(this.loginInterval);
      this.loginInterval = null;
    }
    this.loginInterval = setInterval(this.checkSessionTime, 1000);
  }
}
