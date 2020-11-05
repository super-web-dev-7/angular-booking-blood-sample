import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {URL_JSON} from '../../../../utils/url_json';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-popup-shift-schedule',
  templateUrl: './popup-shift-schedule.component.html',
  styleUrls: ['./popup-shift-schedule.component.scss']
})
export class PopupShiftScheduleComponent implements OnInit {
  moveForm: FormGroup;
  @Input() isMobile;
  @Input() isTablet;
  @Input() appointmentId;
  allTimes = [];
  selectedPTime = null;
  displayData: any;
  currentUser: any;
  addressData = null;
  success = false;

  @Output() closeSide = new EventEmitter();
  constructor(
    public formBuilder: FormBuilder,
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
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.appointmentId).subscribe((res: any) => {
      this.displayData = res;
      if (this.displayData) {
        this.httpService.get(URL_JSON.BASE + 'booking_time/agency/' + this.displayData.agencyId).subscribe((resp: any) => {
          this.allTimes = resp;
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
      appointmentId: this.appointmentId,
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
    this.closeSide.emit(false);
  }

}
