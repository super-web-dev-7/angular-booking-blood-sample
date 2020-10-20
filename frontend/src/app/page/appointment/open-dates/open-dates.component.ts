import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';

import {NewComponent} from '../new/new.component';
import {AppointmentViewComponent} from '../appointment-view/appointment-view.component';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-open-dates',
  templateUrl: './open-dates.component.html',
  styleUrls: ['./open-dates.component.scss']
})
export class OpenDatesComponent implements OnInit {

  displayedColumns: string[] = ['no', 'date', 'time', 'patient', 'nurse', 'lastDoctor', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;
  selectedButton = 0;

  allAppointment = [];
  appointments = [];
  filterValue = null;

  orderStatus = {
    active: '',
    direction: ''
  };

  title = 'Offene';
  agencies = [];

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const url = this.router.url.split('/');
    if (url[2] === 'new') {
      this.openDialog();
    } else if (url[2] === 'open-dates') {
      this.title = 'Offene';
    } else if (url[2] === 'confirmed') {
      this.title = 'Bestätigte';
    } else if (url[2] === 'canceled') {
      this.title = 'Stornierte / verschobene';
    } else if (url[2] === 'completed') {
      this.title = 'Abgeschlossene';
    }
    this.httpService.get(URL_JSON.APPOINTMENT + '/get').subscribe((res: any) => {
      this.allAppointment = res;
      if (url[2] === 'open-dates') {
        this.appointments = this.allAppointment.filter(item => item.adminStatus === 'upcoming');
      } else if (url[2] === 'confirmed') {
        this.appointments = this.allAppointment.filter(item => item.adminStatus === 'confirmed');
      } else if (url[2] === 'canceled') {
        this.appointments = this.allAppointment.filter(item => item.adminStatus === 'canceled');
      } else if (url[2] === 'completed') {
        this.appointments = this.allAppointment.filter(item => item.adminStatus === 'completed');
      }
      for (const appointment of this.appointments) {
        if (!this.agencies.includes(item => item.id === appointment.agency.id)) {
          this.agencies.push(appointment.agency);
        }
      }
      this.dataSource.data = this.appointments;
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

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  selectButton = (id) => {
    this.selectedButton = id;
    if (id === 0) {
      this.dataSource.data = this.appointments;
      return;
    }
    this.dataSource.data = this.appointments.filter(item => item.agency.id === id);
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.selectedDeleteItem = null;
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '650px',
      position: {left: '15%'}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('appointment/open-dates');
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  detail = element => {
    const dialogRef = this.dialog.open(AppointmentViewComponent, {
      width: '650px',
      position: {left: '15%'},
      data: element
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
