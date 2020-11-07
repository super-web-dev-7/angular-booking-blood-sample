import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';

import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import {AuthService} from '../../../../service/auth/auth.service';
import {DialogSuccessComponent} from '../dialog-success/dialog-success.component';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class CancelAppointmentComponent implements OnInit {
  showMessage: boolean;
  success = false;
  cancelForm: FormGroup;
  displayData: any;
  currentUser: any;
  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancelAppointmentComponent>,
    public httpService: HttpService,
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.showMessage = false;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
    this.cancelForm = this.formBuilder.group({
      message: [null],
    });
  }

  openMessage = () => {
    this.showMessage = !this.showMessage;
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  submit = () => {
    const data = {
      appointmentId: this.data?.appointmentId,
      userId: this.currentUser.id,
      content: this.f.message.value
    };
    this.httpService.post(URL_JSON.PATIENT + '/cancel_appointment_by_patient', data).subscribe((res: any) => {
      if (res) {
        const dialogRef = this.dialog.open(DialogSuccessComponent, {
          width: '662px'
        });
        dialogRef.close();
      }
    });
  }

  get f(): any {
    return this.cancelForm.controls;
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
