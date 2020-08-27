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

  // dashboard
  getDashboardInfo = () => {
    return this.http.get(`${URL_JSON.DASHBOARD}/get_all`);
  }

  create = (url, newData) => {
    return this.http.post(`${url}/create`, newData);
  }

  get = (url) => {
    return this.http.get(`${url}`);
  }

  delete = (url) => {
    return this.http.delete(`${url}`);
  }

  update = (url, updateData) => {
    return this.http.put(`${url}`, updateData);
  }

  // working-group

  // user

  // calendar

  // template

  // package
  getPackages = () => {
    return this.http.get(`${URL_JSON.PACKAGE}/get_all`);
  }

  createPackage = (newPackage) => {
    return this.http.post(`${URL_JSON.PACKAGE}/create`, newPackage);
  }

  updatePackage = (id, updatePackage) => {
    return this.http.put(`${URL_JSON.PACKAGE}/update/${id}`, updatePackage);
  }

  deletePackage = (id) => {
    return this.http.delete(`${URL_JSON.PACKAGE}/delete/${id}`);
  }
}