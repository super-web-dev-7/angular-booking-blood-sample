import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {SearchModalComponent} from '../search-modal/search-modal.component';
import {AnswerInquiryComponent} from '../answer-inquiry/answer-inquiry.component';
import {SuccessDialogComponent} from '../answer-inquiry/success-dialog/success-dialog.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../../service/shared/shared.service';
import {SearchInputComponent} from '../search-input/search-input.component';
import {MatSort} from '@angular/material/sort';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';
import {SocketService} from '../../../../service/socket/socket.service';

@Component({
  selector: 'app-patinet-inquiry',
  templateUrl: './patinet-inquiry.component.html',
  styleUrls: ['./patinet-inquiry.component.scss']
})
export class PatinetInquiryComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  activeCallbackDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];
  isTablet = false;
  allInquiry;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  editingAppointment = [];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public httpService: HttpService,
    public socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.activeCallbackDataSource.sort = this.sort;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsWithActiveCallback').subscribe((res: any) => {
      console.log('resA', res);
      this.activeCallbackDataSource.data = res;
      this.allInquiry = res;
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

  conditionEditing = (data, table) => {
    return this.editingAppointment.findIndex(item => {
      return item.appointmentId === data.id && item.table === table;
    });
  }

  filter = () => {
    this.activeCallbackDataSource.data = this.allInquiry.filter(item => {
      return this.getFullName(item.patientFirstName, item.patientLastName).includes(this.filterValue)
        || this.getTimeDuration(item.startTime, item.duration).includes(this.filterValue);
    });
  }

  getFullName = (firstName, lastName) => {
    return firstName + ' ' + lastName;
  }

  onSort = (event) => {
    this.orderStatus = event;
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

  getTimeDuration = (startTime, duration) => {
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  searchItem = (id) => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      const data = {
        title: 'inquiry',
        appointmentId: id,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(SearchModalComponent, {
        width: '827px',
        data: {callbackId: id}
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
    if (this.isTablet) {
      const data = {
        title: 'answer',
        appointmentId: id,
      };
      this.sharedService.tabletSide.emit(data);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnswerInquiryComponent, {
        width: '1347px', position: {top: '5%', left: '21%'},
        data: {appointmentId: id}
      });
      dialogRef.afterClosed().subscribe(res => {
        this.socketService.editCallbackTable({
          doctorId: this.currentUser.id,
          appointmentId: id,
          doctorFirstName: this.currentUser.firstName,
          doctorLastName: this.currentUser.lastName,
          table: 1,
          type: 0
        });
        if (res) {
          this.dialog.open(SuccessDialogComponent, {
            width: '662px',
            height: '308px'
          });
        }
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
