import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import * as moment from 'moment';
import {URL_JSON} from '../../../../utils/url_json';

@Component({
  selector: 'app-move-appointment',
  templateUrl: './move-appointment.component.html',
  styleUrls: ['./move-appointment.component.scss']
})
export class MoveAppointmentComponent implements OnInit {
  moveForm: FormGroup;
  allTimes = [];
  selectedPTime = null;
  displayData: any;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MoveAppointmentComponent>,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.moveForm = this.formBuilder.group({
      plz: [null, Validators.required],
      ort: [null, Validators.required],
      street: [null, Validators.required],
      message: ['', Validators.required]
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
  }

  get f(): any {
    return this.moveForm.controls;
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  submit = () => {
    if (this.moveForm.invalid) {
      return;
    }
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
