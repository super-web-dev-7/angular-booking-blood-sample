import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HttpService} from '../../service/http/http.service';
import {URL_JSON} from '../../utils/url_json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isMobile = false;
  data: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    public httpRequest: HttpService
  ) {
    breakpointObserver.observe([
      Breakpoints.Handset,
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  ngOnInit(): void {
    this.httpRequest.get(URL_JSON.BASE + 'dashboard/superadmin').subscribe(res => {
      this.data = res;
    });
  }

}
