import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
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
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../service/shared/shared.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  showDetail: boolean;
  isMobile = false;
  isTablet = false;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.showDetail = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    const url = this.router.url.split('/');
    if (url[2] === 'new_appointment') {
      this.openDialog();
    }
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
      this.sharedService.patientPopup.emit('cancel');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(CancelAppointmentComponent, {
        width: '662px',
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  moveAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.sharedService.patientPopup.emit('move');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(MoveAppointmentComponent, {
        width: '662px',
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  editAnamnesis = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.sharedService.patientPopup.emit('edit');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(EditAnamnesisComponent, {
        width: '1060px',
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
      this.sharedService.patientPopup.emit('package');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(ChangePackageComponent, {
        width: '1182px',
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
      this.sharedService.patientPopup.emit('callback');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(CallbackDoctorComponent, {
        width: '1182px',
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  callSister = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.sharedService.patientPopup.emit('sister');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(CallSisterComponent, {
        width: '662px',
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  openPaymentStatus = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.sharedService.patientPopup.emit('payment');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(PaymentStatusComponent, {
        width: '662px',
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }

  newAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.sharedService.patientPopup.emit('new');
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
      this.sharedService.patientPopup.emit('history');
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
