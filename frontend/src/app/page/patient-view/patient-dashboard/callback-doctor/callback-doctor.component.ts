import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';

@Component({
  selector: 'app-callback-doctor',
  templateUrl: './callback-doctor.component.html',
  styleUrls: ['./callback-doctor.component.scss']
})
export class CallbackDoctorComponent implements OnInit {
  selectedDay: any;
  times = [
    {time: 'morning', label: 'Vormittags (09:00 - 12:00)'},
    {time: 'afternoon', label: 'Nachmittags (12:00 - 16:00)'},
    {time: 'evening', label: 'Abends (16:00 - 19:00)'}
  ];
  selectedTime = null;
  isValid = false;
  isEditPhone = false;
  callbackForm: FormGroup;
  displayData: any;
  defaultPhone = null;
  dateControl: any;
  constructor(
    public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CallbackDoctorComponent>,
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.selectedDay = 'today';
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
      this.defaultPhone = this.displayData.patientNumber;
      this.setPhone(res.patientNumber);
    });
    this.callbackForm = this.formBuilder.group({
      phone: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{11,13}$')]],
      title: [null, Validators.required],
      message: [null, Validators.required],
    });
    this.dateControl = new FormControl(new Date());
  }

  get f(): any {
    return this.callbackForm.controls;
  }

  setPhone = (phone) => {
    this.f.phone.setValue(phone);
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  formatDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
      .toISOString()
      .split('T')[0];
  }

  submit = () => {
    if (this.callbackForm.invalid) {
      return;
    }
    let selectedDate;
    if (this.selectedDay === 'today') {
      const today = new Date();
      selectedDate = this.formatDate(today);
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      selectedDate = this.formatDate(tomorrow);
    }
    const data = {
      appointmentId: this.data.appointmentId,
      date: selectedDate,
      time: this.selectedTime,
      phoneNumber: this.f.phone.value,
      schedule: this.f.title.value,
      message: this.f.message.value
    };
    this.httpService.post(URL_JSON.PATIENT + '/createCallbackForDoctor', data).subscribe((res: any) => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  close = () => {
    this.dialogRef.close(false);
  }

  selectDay = (event) => {
    this.selectedDay = event;
  }

  selectTime = (event) => {
    this.selectedTime = event.time;
  }

}
