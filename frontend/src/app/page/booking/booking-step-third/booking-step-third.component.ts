import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

import {MustMatch} from '../../../shared/confirm-password.validator';
import {URL_JSON} from '../../../utils/url_json';
import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-booking-step-third',
  templateUrl: './booking-step-third.component.html',
  styleUrls: ['./booking-step-third.component.scss']
})
export class BookingStepThirdComponent implements OnInit {

  @Input() bookingData;
  @Output() deselectEvent = new EventEmitter();
  @Output() setDataEvent = new EventEmitter();
  packageNames = [
    'Männermedizin',
    'Gesundheits-Check-Up',
    'Corona',
    'Gutes Immunsystem',
    'Sexuelle Gesundheit',
    'Basis'
  ];
  paymentOptions = [
    {label: 'Heidelpay', value: 'alternative'},
    {label: 'Invoice', value: 'customerStore'}
  ];
  patientForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    console.log(this.bookingData);
    this.patientForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{11,13}$')]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      street: [null, Validators.required],
      age: [null, Validators.required],
      ageView: [null, Validators.required],
      gender: [null, Validators.required],
      plz: [null, Validators.required],
      ort: [null, Validators.required],
      differentPlace: [false, Validators.required],
      alternative: [false],
      customerStore: [false],
      otherStreet: [null],
      otherPostalCode: [null],
      otherCity: [null],
      message: [null],
      payment: [null, Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get f(): any {
    return this.patientForm.controls;
  }

  deselectPackage = () => {
    this.deselectEvent.emit({
      type: 'package'
    });
  }

  deselectAdditionalPackage = () => {
    this.deselectEvent.emit({
      type: 'additionalPackage'
    });
  }

  getTimeDuration = time => {
    return moment(time).format('DD.MM.YYYY HH:mm') + '-' + moment(time + this.bookingData.duration).format('HH:mm');
  }

  setDateAndAge = event => {
    this.f.ageView.setValue(this.getAgeType(event.value));
  }

  getAgeType = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return moment(birthDate).format('DD/MM/YYYY') + `  (${age > 0 ? age : 0} Jahre)`;
  }

  checkPostalCode = (type) => {
    if (type === 'plz') {
      this.httpService.get(URL_JSON.ZIPCODE + '/check_postal_code_all/' + this.f.plz.value).subscribe((res: any) => {
        if (!res) {
          this.f.plz.setErrors(Validators.required);
        } else {
          this.f.ort.setValue(res?.ort);
          // this.f.street.setValue(res?.district);
          this.f.plz.setErrors(null);
        }
      });
    }
    if (type === 'otherPostalCode') {
      this.httpService.checkPostalCode(this.f.otherPostalCode.value).subscribe((res: any) => {
        if (!res) {
          this.f.otherPostalCode.setErrors(Validators.required);
        } else {
          this.f.otherCity.setValue(res?.city);
          this.f.otherStreet.setValue(res?.district);
          this.f.otherPostalCode.setErrors(null);
        }
      });
    }
  }

  changeCheckboxValue = () => {
    this.f.differentPlace.setValue(!this.f.differentPlace.value);

    if (this.f.differentPlace.value) {
      this.f.otherStreet.setValidators([Validators.required]);
      this.f.otherPostalCode.setValidators([Validators.required]);
      this.f.otherCity.setValidators([Validators.required]);
    } else {
      this.f.otherStreet.setValidators(null);
      this.f.otherPostalCode.setValidators(null);
      this.f.otherCity.setValidators(null);
    }
    this.f.otherStreet.updateValueAndValidity();
    this.f.otherPostalCode.updateValueAndValidity();
    this.f.otherCity.updateValueAndValidity();
  }

  selectPayment = value => {
    if (value === 'alternative') {
      this.f.alternative.setValue(true);
      this.f.customerStore.setValue(false);
    }
    if (value === 'customerStore') {
      this.f.alternative.setValue(false);
      this.f.customerStore.setValue(true);
    }
    console.log(this.f.alternative.value, this.f.customerStore.value);
  }

  submit = () => {
    if (this.patientForm.invalid) {
      return;
    }
    const data = {
      email: this.f.email.value,
      phoneNumber: this.f.phoneNumber.value,
      password: this.f.password.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      street: this.f.street.value,
      age: this.f.age.value,
      gender: this.f.gender.value,
      plz: this.f.plz.value,
      ort: this.f.ort.value,
      differentPlace: this.f.differentPlace.value,
      customerStore: this.f.customerStore.value,
      alternative: this.f.alternative.value,
      otherStreet: this.f.otherStreet.value,
      otherCity: this.f.otherCity.value,
      otherPostalCode: this.f.otherPostalCode.value
    };
    const message = {
      message: this.f.message.value
    };
    this.setDataEvent.emit({patient: data, message});
    console.log(data);
    console.log(message);
  }

}
