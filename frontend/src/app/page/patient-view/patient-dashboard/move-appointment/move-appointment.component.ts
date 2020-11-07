import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

import {URL_JSON} from '../../../../utils/url_json';
import {HttpService} from '../../../../service/http/http.service';
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
  availableZipCode = [];

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
        this.httpService.get(URL_JSON.BASE + 'booking_time/agency/' + this.displayData.agencyId).subscribe((resp: any) => {
          this.allTimes = resp;
        });
        this.httpService.get(URL_JSON.ZIPCODE + '/available_zipcode_by_agency/' + this.displayData.agencyId).subscribe((zipcode: any) => {
          this.availableZipCode = zipcode;
        });
      }
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

  checkPostalCode = () => {
    const index = this.availableZipCode.findIndex(item => item.zipcode === parseInt(this.f.plz.value, 10));
    if (index > -1) {
      this.f.plz.setErrors(null);
      this.f.ort.setValue(this.availableZipCode[index].city);
      this.f.street.setValue(this.availableZipCode[index].district);
    } else {
      this.f.plz.setErrors(Validators.required);
      this.f.ort.setValue(null);
      this.f.street.setValue(null);
    }
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
    if (this.selectedPTime === null) {
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
    console.log(data);
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
