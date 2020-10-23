import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';

import {AuthService} from '../../../../service/auth/auth.service';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';


@Component({
  selector: 'app-archive-event',
  templateUrl: './archive-event.component.html',
  styleUrls: ['./archive-event.component.scss']
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
  allAppointments: any;
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
