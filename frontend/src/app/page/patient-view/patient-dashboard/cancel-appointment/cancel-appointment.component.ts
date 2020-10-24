import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';

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
  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancelAppointmentComponent>,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.showMessage = false;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
    this.cancelForm = this.formBuilder.group({
      message: [null, Validators.required],
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
    if (this.cancelForm.invalid) {
      return;
    }
  }

  get f(): any {
    return this.cancelForm.controls;
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
