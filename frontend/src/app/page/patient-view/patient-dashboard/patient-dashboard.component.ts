import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import * as moment from 'moment';

import {CancelAppointmentComponent} from './cancel-appointment/cancel-appointment.component';
import {MoveAppointmentComponent} from './move-appointment/move-appointment.component';
import {EditAnamnesisComponent} from './edit-anamnesis/edit-anamnesis.component';
import {ChangePackageComponent} from './change-package/change-package.component';
import {CallbackDoctorComponent} from './callback-doctor/callback-doctor.component';
import {CallSisterComponent} from './call-sister/call-sister.component';
import {PaymentStatusComponent} from './payment-status/payment-status.component';
import {NewAppointmentComponent} from '../new-appointment/new-appointment.component';
import {AppointmentNewComponent} from '../new-appointment/appointment-new/appointment-new.component';
import {AppointmentHistoryComponent} from './appointment-history/appointment-history.component';
import {SharedService} from '../../../service/shared/shared.service';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {AuthService} from '../../../service/auth/auth.service';
import {DialogSuccessComponent} from './dialog-success/dialog-success.component';


@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  showDetail: boolean;
  isMobile = false;
  isTablet = false;
  allPackages = [];
  allAppointments = [];
  currentUser: any;
  adminStatus = {
    upcoming: 'Labordaten übermittelt',
    confirmed: 'Termin bestätigt',
    canceled: 'Nicht angetroffen',
    successful: 'Befund freigegeben'
  };

  selectedAppointment = null;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showDetail = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.currentUser = this.authService.currentUserValue;
    const url = this.router.url.split('/');
    if (url[2] === 'new_appointment') {
      this.openDialog();
    }

    this.httpService.get(URL_JSON.PACKAGE + '/getAllPackagesWithAppointment').subscribe((res: any) => {
      this.allPackages = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentByPatient/' + this.currentUser.id).subscribe((res: any) => {
      console.log(res);
      this.allAppointments = res;
    });
  }

  getTimeDuration = (startTime, duration) => {
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewAppointmentComponent, {
      width: '662px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/patient');
      this.dialog.open(AppointmentNewComponent, {
        width: '1182px',
      });
    });
  }

  cancelAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'cancel',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(CancelAppointmentComponent, {
        width: '662px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  moveAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'move',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(MoveAppointmentComponent, {
        width: '662px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  editAnamnesis = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'edit',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(EditAnamnesisComponent, {
        width: '1060px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          dialogRef = this.dialog.open(EditAnamnesisComponent, {
            width: '662px'
          });
        }
      });
    }
  }

  changePackage = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'package',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(ChangePackageComponent, {
        width: '1182px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  openPersonalInfo = () => {
    this.showDetail = !this.showDetail;
  }

  openCallbackDoctor = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'callback',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(CallbackDoctorComponent, {
        width: '1182px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          dialogRef = this.dialog.open(DialogSuccessComponent, {
            width: '627px'
          });
        }
      });
    }
  }

  callSister = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'sister',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(CallSisterComponent, {
        width: '662px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  openPaymentStatus = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'payment',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(PaymentStatusComponent, {
        width: '662px',
        data: {appointmentId: this.selectedAppointment}
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  newAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'new',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(NewAppointmentComponent, {
        width: '662px',
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.dialog.open(AppointmentNewComponent, {
            width: '1182px',
          });
        }
      });
    }
  }

  openHistory = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      const emitData = {
        title: 'history',
        data: {
          appointmentId: this.selectedAppointment
        }
      };
      this.sharedService.patientPopup.emit(emitData);
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AppointmentHistoryComponent, {
        width: '662px',
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

}
