import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';

import {AuthService} from '../../../../service/auth/auth.service';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-archive-event',
  templateUrl: './archive-event.component.html',
  styleUrls: ['./archive-event.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArchiveEventComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  dataSource = new MatTableDataSource<any>();
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  displayedColumns: string[] = ['no', 'date', 'time', 'package', 'appointmentLocation', 'doctorLast', 'status', 'actions'];
  displayedColumnsMobile: string[] = ['no', 'date', 'package', 'doctorLast', 'status'];
  allAppointments: any;
  expandedElement = null;
  status = {
    upcoming: 'Offene Termine',
    confirmed: 'Bestätigte Termine',
    canceled: 'Storniert / Verschoben',
    successful: 'Abgeschlossene Termine'
  };
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsWithArchived').subscribe((res: any) => {
      this.allAppointments = res;
      this.dataSource.data = res;
      this.expandedElement = this.dataSource.data;
    });
  }

  getDate = (time) => {
    moment.locale('de');
    return moment(time).format('DD.MM.YYYY');
  }

  getTime = (time) => {
    moment.locale('de');
    return moment(time).format('HH:mm');
  }

  filter = () => {
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  editItem = () => {
  }

}
