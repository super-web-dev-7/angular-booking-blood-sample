import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

import {HttpService} from '../../../service/http/http.service';
import {AuthService} from '../../../service/auth/auth.service';
import {MustMatch} from '../../../shared/confirm-password.validator';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  patientForm: FormGroup;
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{11,13}$';
  genders = [
    {label: 'Female', value: 'Weiblich'},
    {label: 'Male', value: 'Männlich'},
    {label: 'Divers', value: 'Divers'},
  ];
  patientData: any;
  paymentSelectionError = false;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.httpService.get(URL_JSON.USER + '/getPatientById/' + this.data.id).subscribe((res: any) => {
        this.patientData = res;
      });
    }
    this.patientForm = this.formBuilder.group({
      email: [this.data?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data?.phoneNumber, [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      salutation: [this.data?.salutation, Validators.required],
      street: [this.data?.street, Validators.required],
      age: [this.data?.age, Validators.required],
      ageView: [this.data ? this.getAgeType(this.data.age) : null, Validators.required],
      gender: [this.data?.gender, Validators.required],
      plz: [this.data?.plz, Validators.required],
      ort: [this.data?.ort, Validators.required],
      differentPlace: [this.data ? this.data?.differentPlace : false, Validators.required],
      customerStore: [this.data ? this.data?.customerStore : false],
      alternative: [this.data ? this.data?.alternative : false],
      sendSMS: [this.data ? this.data?.sendSMS : false, Validators.required],
      otherStreet: [this.data?.otherStreet],
      otherPostalCode: [this.data?.otherPostalCode],
      otherCity: [this.data?.otherCity]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
    if (this.f.differentPlace.value) {
      this.f.otherStreet.setValidators([Validators.required]);
      this.f.otherPostalCode.setValidators([Validators.required]);
      this.f.otherCity.setValidators([Validators.required]);
      this.f.otherStreet.updateValueAndValidity();
      this.f.otherPostalCode.updateValueAndValidity();
      this.f.otherCity.updateValueAndValidity();
    }
  }

  get f(): any {
    return this.patientForm.controls;
  }

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.f.password.setValue(password);
    this.f.confirmPassword.setValue(password);
  }

  getAgeType = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      age--;
    }
    return moment(birthDate).format('DD/MM/YYYY') + `  (${age > 0 ? age : 0} Jahre)`;
  }

  setDateAndAge = event => {
    this.f.ageView.setValue(this.getAgeType(event.value));
  }

  checkPostalCode = (type) => {
    if (type === 'plz') {
      this.httpService.get(URL_JSON.BASE + '/zipcode/check_postal_code_all/' + this.f.plz.value).subscribe((res: any) => {
        if (!res) {
          this.f.plz.setErrors(Validators.required);
        } else {
          this.f.ort.setValue(res?.ort);
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
          this.f.otherPostalCode.setErrors(null);
        }
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }

  changeCheckboxValue = (item) => {
    this.f[item].setValue(!this.f[item].value);
    if (item === 'alternative' || item === 'customerStore') {
      this.paymentSelectionError = false;
    }
    if (item === 'differentPlace') {
      if (this.f[item].value) {
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
  }

  createPatient = () => {
    if (this.patientForm.invalid) {
      return;
    } else if (!this.f.alternative.value && !this.f.customerStore.value) {
      this.paymentSelectionError = true;
      return;
    }

    const data = {
      email: this.f.email.value,
      phoneNumber: this.f.phoneNumber.value,
      password: this.f.password.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      salutation: this.f.salutation.value,
      street: this.f.street.value,
      age: this.f.age.value,
      gender: this.f.gender.value,
      plz: this.f.plz.value,
      ort: this.f.ort.value,
      differentPlace: this.f.differentPlace.value,
      customerStore: this.f.customerStore.value,
      alternative: this.f.alternative.value,
      sendSMS: this.f.sendSMS.value,
      otherStreet: this.f.otherStreet.value,
      otherCity: this.f.otherCity.value,
      otherPostalCode: this.f.otherPostalCode.value
    };
    if (this.data) {
      this.httpService.update(URL_JSON.USER + '/updatePatientById/' + this.data.user_id, data).subscribe((res: any) => {
        res.id = this.data.user_id;
        this.dialogRef.close(res);
      }, () => {
        this.snackBar.open('Dieser User ist bereits im System vorhanden.', '', { duration: 2000 });
      });
    } else {
      this.httpService.create(URL_JSON.USER + '/patient', data).subscribe(res => {
        this.dialogRef.close(res);
      }, () => {
        this.snackBar.open('Dieser User ist bereits im System vorhanden.', '', {duration: 2000});
      });
    }
  }
}
