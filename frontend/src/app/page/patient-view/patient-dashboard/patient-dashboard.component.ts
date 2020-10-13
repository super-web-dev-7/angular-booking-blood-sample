import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  showDetail: boolean;

  constructor(
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.showDetail = false;
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
    });
  }

  cancelAppointment = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(CancelAppointmentComponent, {
      width: '662px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  moveAppointment = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(MoveAppointmentComponent, {
      width: '662px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  editAnamnesis = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(EditAnamnesisComponent, {
      width: '1060px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  changePackage = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(ChangePackageComponent, {
      width: '1182px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  openPersonalInfo = () => {
    this.showDetail = !this.showDetail;
  }

  openCallbackDoctor = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(CallbackDoctorComponent, {
      width: '1182px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  callSister = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(CallSisterComponent, {
      width: '662px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  openPaymentStatus = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(PaymentStatusComponent, {
      width: '662px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  newAppointment = () => {
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

  openHistory = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(AppointmentHistoryComponent, {
      width: '662px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

}
