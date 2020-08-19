import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {URL_JSON} from '../../utils/url_json';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    public http: HttpClient
  ) { }

  getDashboardInfo = () => {
    return this.http.get(`${URL_JSON.DASHBOARD}/get_all`);
  }
}
