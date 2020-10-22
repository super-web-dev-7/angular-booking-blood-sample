import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

import {AuthService} from '../../../service/auth/auth.service';
import {eventData, patientInjuryData} from '../../../utils/mock_data';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {AnswerInquiryComponent} from './answer-inquiry/answer-inquiry.component';
import {AnamnesViewComponent} from './anamnes-release/anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-release/anamnes-check/anamnes-check.component';
import {ViewAppointmentComponent} from './event/view-appointment/view-appointment.component';
import {SharedService} from '../../../service/shared/shared.service';
import {SearchInputComponent} from './search-input/search-input.component';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {SuccessDialogComponent} from './answer-inquiry/success-dialog/success-dialog.component';
import {MatSort} from '@angular/material/sort';

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
  orderStatus = {
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
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceE.data = eventData;
    this.anamnesisDataSource.sort = this.sort;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsByAnamnes').subscribe((res: any) => {
      console.log(res);
      this.anamnesisDataSource.data = res;
      this.allAnamnesis = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsWithActiveCallback').subscribe((res: any) => {
      console.log('res', res);
      this.activeCallbackDataSource = res;
    });
  }

  filter = () => {
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  onAnamsSort = (event) => {
    this.orderStatus = event;
    const anams = [...this.allAnamnesis];

    if (event.active === 'patientName') {
      anams.sort((a, b) => {
        const x = a.patientFirstName + '' + a.patientLastName;
        const y = b.patientFirstName + '' + b.patientLastName;
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


  getTimeDuration = (startTime, duration) => {
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
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

  openAnswer = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const data = {
        title: 'answer',
        appointmentId: null,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnswerInquiryComponent, {
        width: '1347px', position: {top: '5%', left: '21%'}
      });
      dialogRef.afterClosed().subscribe(res => {
        this.sharedService.closeHistory.emit();
      });
    }
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
        if (res) {
          dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '627px'
          });
        }
      });
    }
  }

  viewAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const data = {
        title: 'v-appointment',
        appointmentId: null,
      };
      this.sharedService.tabletSide.emit(data);
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
