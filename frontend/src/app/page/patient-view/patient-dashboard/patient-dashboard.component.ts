import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CancelAppointmentComponent} from './cancel-appointment/cancel-appointment.component';
import {MoveAppointmentComponent} from './move-appointment/move-appointment.component';
import {EditAnamnesisComponent} from './edit-anamnesis/edit-anamnesis.component';
import {ChangePackageComponent} from './change-package/change-package.component';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  showDetail: boolean;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.showDetail = false;
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

}
