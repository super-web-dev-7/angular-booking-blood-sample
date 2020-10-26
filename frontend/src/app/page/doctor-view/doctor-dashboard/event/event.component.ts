import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../../service/shared/shared.service';
import {SearchInputComponent} from '../search-input/search-input.component';
import {URL_JSON} from '../../../../utils/url_json';
import {HttpService} from '../../../../service/http/http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  dataSourceE = new MatTableDataSource<any>();
  displayedColumnsE: string[] = ['no', 'date', 'time', 'package', 'appointmentLocation', 'doctorLast', 'status', 'actions'];
  isTablet = false;
  allEvents: any;
  status = {
    upcoming: 'Offene Termine',
    confirmed: 'Bestätigte Termine',
    canceled: 'Storniert / Verschoben',
    successful: 'Abgeschlossene Termine'
  };
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsWithoutArchived').subscribe((res: any) => {
      this.dataSourceE.data = res;
      this.allEvents = res;
      console.log('eventSource@@@@@@@@', res);
    });
  }
  filter = () => {
    this.dataSourceE.data = this.allEvents.filter(item => {
      return this.getDate(item.startTime).includes(this.filterValue)
        || this.getTime(item.startTime).includes(this.filterValue)
        || item.package.includes(this.filterValue)
        || this.getAddress(item.addressPlz, item.addressOrt).includes(this.filterValue);
    });
  }

  getTimeDuration = (startTime, duration) => {
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  onSort = (event) => {
    this.orderStatus = event;
    const events = [...this.allEvents];
    if (event.active === 'date') {
      events.sort((a, b) => {
        const x = this.getDate(a.startTime);
        const y = this.getDate(b.startTime);
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSourceE.data = this.allEvents;
      } else {
        this.dataSourceE.data = events;
      }
    } else if (event.active === 'time') {
     events.sort((a, b) => {
        const x = this.getTime(a.startTime);
        const y = this.getTime(b.startTime);
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
     if (event.direction === '') {
        this.dataSourceE.data = this.allEvents;
     } else {
        this.dataSourceE.data = events;
     }
    } else if (event.active === 'package') {
      events.sort((a, b) => {
        const x = a.package;
        const y = b.package;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
      if (event.direction === '') {
        this.dataSourceE.data = this.allEvents;
      } else {
        this.dataSourceE.data = events;
      }
    } else if (event.active === 'appointmentLocation') {
      events.sort((a, b) => {
        const x = this.getAddress(a.addressPlz, a.addressOrt);
        const y = this.getAddress(b.addressPlz, b.addressOrt);
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
      if (event.direction === '') {
        this.dataSourceE.data = this.allEvents;
      } else {
        this.dataSourceE.data = events;
      }
    }
  }

  editItem = (id) => {
  }

  getDate = (time) => {
    moment.locale('de');
    return moment(time).format('DD.MM.YYYY');
  }

  getTime = (time) => {
    moment.locale('de');
    return moment(time).format('HH:mm');
  }

  getAddress = (plz, ort) => {
    return plz + ' ' + ort;
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      this.sharedService.tabletSide.emit('v-appointment');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(ViewAppointmentComponent, {
        width: '827px',
      });
      this.afterClosed(dialogRef);
    }
  }

  openSearchDialog = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(SearchInputComponent, {
      width: '100vw', maxWidth: '100vw', maxHeight: '100%', position: {top: '-10px'}
    });
    this.afterClosed(dialogRef);
  }
}
