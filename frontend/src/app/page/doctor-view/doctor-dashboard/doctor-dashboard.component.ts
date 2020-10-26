import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import * as moment from 'moment';

import {AuthService} from '../../../service/auth/auth.service';
import {URL_JSON} from '../../../utils/url_json';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {AnswerInquiryComponent} from './answer-inquiry/answer-inquiry.component';
import {AnamnesViewComponent} from './anamnes-release/anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-release/anamnes-check/anamnes-check.component';
import {ViewAppointmentComponent} from './event/view-appointment/view-appointment.component';
import {SharedService} from '../../../service/shared/shared.service';
import {SearchInputComponent} from './search-input/search-input.component';
import {HttpService} from '../../../service/http/http.service';
import {SuccessDialogComponent} from './answer-inquiry/success-dialog/success-dialog.component';
import {SocketService} from '../../../service/socket/socket.service';


@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  activeCallbackDataSource = new MatTableDataSource<any>();
  dataSourceE = new MatTableDataSource<any>();
  anamnesisDataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  orderStatusA = {
    active: '',
    direction: ''
  };
  orderStatusB = {
    active: '',
    direction: ''
  };
  orderStatusC = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  displayedColumns: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];
  displayedColumnsA: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];
  displayedColumnsE: string[] = ['no', 'date', 'time', 'package', 'appointmentLocation', 'doctorLast', 'status', 'actions'];
  isTablet = false;
  isMobile = false;
  allAnamnesis: any;
  allInquiry: any;
  allEvents: any;
  status = {
    upcoming: 'Offene Termine',
    confirmed: 'Bestätigte Termine',
    canceled: 'Storniert / Verschoben',
    successful: 'Abgeschlossene Termine'
  };
  editingAppointment = [];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public httpService: HttpService,
    public socketService: SocketService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.anamnesisDataSource.sort = this.sort;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsByAnamnes').subscribe((res: any) => {
      this.anamnesisDataSource.data = res;
      this.allAnamnesis = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsWithActiveCallback').subscribe((res: any) => {
      this.activeCallbackDataSource.data = res;
      this.allInquiry = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsWithoutArchived').subscribe((res: any) => {
      this.dataSourceE.data = res;
      this.allEvents = res;
    });

    this.httpService.get(URL_JSON.DOCTOR + '/getEditingStatus').subscribe((res: any) => {
      this.editingAppointment = res;
    });

    this.socketService.editingNotification.subscribe(data => {
      if (data.type) {
        this.editingAppointment.push(data);
      } else {
        this.editingAppointment = this.editingAppointment.filter(item => {
          return item.appointmentId !== data.appointmentId && item.type !== data.type && item.doctorId !== data.doctorId;
        });
      }
    });

    this.socketService.closeNotification.subscribe(socketId => {
      this.editingAppointment = this.editingAppointment.filter(item => {
        return item.socketId !== socketId;
      });
    });
  }

  filter = () => {
  }

  onInquirySort = (event) => {
    this.orderStatusA = event;
    const inquiries = [...this.allInquiry];

    if (event.active === 'patientName') {
      inquiries.sort((a, b) => {
        const x = a.patientFirstName + ' ' + a.patientLastName;
        const y = b.patientFirstName + ' ' + b.patientLastName;
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.activeCallbackDataSource.data = this.allInquiry;
      } else {
        this.activeCallbackDataSource.data = inquiries;
      }
    } else if (event.active === 'appointmentDate') {
      inquiries.sort((a, b) => {
        const x = this.getTimeDuration(a.startTime, a.duration);
        const y = this.getTimeDuration(b.startTime, b.duration);
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
      if (event.direction === '') {
        this.activeCallbackDataSource.data = this.allInquiry;
      } else {
        this.activeCallbackDataSource.data = inquiries;
      }
    }
  }

  onAnamsSort = (event) => {
    this.orderStatusB = event;
    const anams = [...this.allAnamnesis];

    if (event.active === 'patientName') {
      anams.sort((a, b) => {
        const x = a.patientFirstName + ' ' + a.patientLastName;
        const y = b.patientFirstName + ' ' + b.patientLastName;
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.anamnesisDataSource.data = this.allAnamnesis;
      } else {
        this.anamnesisDataSource.data = anams;
      }
    } else if (event.active === 'appointmentDate') {
      anams.sort((a, b) => {
        const x = this.getTimeDuration(a.startTime, a.duration);
        const y = this.getTimeDuration(b.startTime, b.duration);
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
      if (event.direction === '') {
        this.anamnesisDataSource.data = this.allAnamnesis;
      } else {
        this.anamnesisDataSource.data = anams;
      }
    }
  }

  onEventSort = (event) => {
    this.orderStatusC = event;
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

  getTimeDuration = (startTime, duration) => {
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
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

  editItem = (id) => {
  }

  searchItem = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const data = {
        title: 'inquiry',
        appointmentId: null,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(SearchModalComponent, {
        width: '827px',
      });
      this.afterClosed(dialogRef);
    }
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAnswer = (id) => {
    this.socketService.editCallbackTable({
      doctorId: this.currentUser.id,
      appointmentId: id,
      doctorFirstName: this.currentUser.firstName,
      doctorLastName: this.currentUser.lastName,
      type: 1,
      table: 1
    });
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const data = {
        title: 'answer',
        callbackId: id,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnswerInquiryComponent, {
        width: '1347px',
        position: {top: '5%', left: '21%'},
        data: {callbackId: id}
      });
      dialogRef.afterClosed().subscribe(res => {
        this.sharedService.closeHistory.emit();
        this.socketService.editCallbackTable({
          doctorId: this.currentUser.id,
          appointmentId: id,
          doctorFirstName: this.currentUser.firstName,
          doctorLastName: this.currentUser.lastName,
          table: 1,
          type: 0
        });
        if (res) {
          dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '627px'
          });
        }
      });
    }
  }

  conditionEditing = (data, table) => {
    return this.editingAppointment.findIndex(item => {
      return item.appointmentId === data.id && item.table === table;
    });
  }

  anamnesView = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      const data = {
        title: 'v-anam',
        appointmentId: null,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnamnesViewComponent, {
        width: '827px',
        height: '844px'
      });
      this.afterClosed(dialogRef);
    }
  }

  checkAnamnes = (id) => {
    this.socketService.editCallbackTable({
      doctorId: this.currentUser.id,
      appointmentId: id,
      doctorFirstName: this.currentUser.firstName,
      doctorLastName: this.currentUser.lastName,
      type: 1,
      table: 2
    });
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const data = {
        title: 'c-anam',
        appointmentId: id,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnamnesCheckComponent, {
        width: '1347px',
        position: {top: '2%', left: '22%'},
        data: {appointmentId: id}
      });
      dialogRef.afterClosed().subscribe(res => {
        this.sharedService.closeHistory.emit();
        this.socketService.editCallbackTable({
          doctorId: this.currentUser.id,
          appointmentId: id,
          doctorFirstName: this.currentUser.firstName,
          doctorLastName: this.currentUser.lastName,
          type: 0,
          table: 2
        });
        if (res) {
          dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '627px'
          });
        }
      });
    }
  }

  viewAppointment = (id) => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const data = {
        title: 'v-appointment',
        appointmentId: id,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(ViewAppointmentComponent, {
        width: '827px',
        data: {appointmentId: id}
      });
      dialogRef.afterClosed().subscribe(res => {
        this.sharedService.closeHistory.emit();
      });
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
