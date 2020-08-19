import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HttpService} from '../../service/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isMobile = false;

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
    this.httpRequest.getDashboardInfo().subscribe(res => {
      console.log(res);
    });
  }

}
