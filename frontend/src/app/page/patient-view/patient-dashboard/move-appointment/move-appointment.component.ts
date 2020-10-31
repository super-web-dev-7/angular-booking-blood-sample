import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import * as moment from 'moment';
import {URL_JSON} from '../../../../utils/url_json';
import {AuthService} from '../../../../service/auth/auth.service';

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
  currentUser: any;
  addressData = null;
  success = false;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MoveAppointmentComponent>,
    public httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.moveForm = this.formBuilder.group({
      plz: [null],
      ort: [null],
      street: [null],
      message: [null]
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
      if (this.displayData) {
        this.getBookingTime(this.displayData.packageId);
      }
    });
  }

  get f(): any {
    return this.moveForm.controls;
  }

  getBookingTime = (id) => {
    this.httpService.get(URL_JSON.BASE + '/booking_time/package/' + id).subscribe((res: any) => {
      this.allTimes = res;
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  checkPostalCode = () => {
    this.httpService.checkPostalCode(this.f.plz.value).subscribe((res: any) => {
      if (!res) {
        this.f.plz.setErrors(Validators.required);
      } else {
        this.f.plz.setErrors(null);
        this.f.ort.setValue(res.city);
        this.f.street.setValue(res.district);
      }
    });
  }

  getDate = time => {
    if (time) {
      moment.locale('de');
      return moment(time).format('ddd DD.MM.YYYY HH:mm');
    } else {
      return null;
    }
  }

  submit = () => {
    if (!this.selectedPTime) {
      return;
    }
    if (this.f.plz.value && this.f.ort.value && this.f.street.value) {
      this.addressData = {
        differentPlace: true,
        otherStreet: this.f.street.value,
        otherCity: this.f.ort.value,
        otherPostalCode: this.f.plz.value
      };
    } else {
      this.addressData = null;
    }
    const data = {
      appointmentId: this.data?.appointmentId,
      patientId: this.currentUser?.id,
      content: this.f.message.value,
      time: this.allTimes[this.selectedPTime],
      address: this.addressData
    };
    this.httpService.post(URL_JSON.PATIENT + '/shift_appointment_by_patient', data).subscribe((res: any) => {
      if (res) {
        this.success = true;
      }
    });
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
