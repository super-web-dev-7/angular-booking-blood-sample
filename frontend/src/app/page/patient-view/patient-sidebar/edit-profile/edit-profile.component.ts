import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

import {URL_JSON} from '../../../../utils/url_json';
import {AuthService} from '../../../../service/auth/auth.service';
import {HttpService} from '../../../../service/http/http.service';
import {MustMatch} from '../../../../shared/confirm-password.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  patientForm: FormGroup;
  verifyForm: FormGroup;
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{11,13}$';
  genders = [
    {label: 'Female', value: 'Weiblich'},
    {label: 'Male', value: 'Männlich'},
    {label: 'Divers', value: 'Divers'},
  ];
  patientInfo: any;
  userInfo: any;
  showVerifyForm = false;
  error: any = null;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
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
      customerStore: [this.data ? this.data?.customerStore : false, Validators.required],
      alternative: [this.data ? this.data?.alternative : false, Validators.required],
      sendSMS: [this.data ? this.data?.sendSMS : false, Validators.required],
      otherStreet: [this.data?.otherStreet],
      otherPostalCode: [this.data?.otherPostalCode],
      otherCity: [this.data?.otherCity]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
    this.verifyForm = this.formBuilder.group({
      code: [null, Validators.required]
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

  get vf(): any {
    return this.verifyForm.controls;
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

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.f.password.setValue(password);
    this.f.confirmPassword.setValue(password);
  }

  checkPostalCode = (type) => {
    if (type === 'plz') {
      this.httpService.get(URL_JSON.ZIPCODE + '/check_postal_code_all/' + this.f.plz.value).subscribe((res: any) => {
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
        }
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }

  changeCheckboxValue = (item) => {
    this.f[item].setValue(!this.f[item].value);
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
    }

    this.userInfo = {
      email: this.f.email.value,
      phoneNumber: this.f.phoneNumber.value,
      password: this.f.password.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value
    };

    this.patientInfo = {
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

    this.httpService.update(URL_JSON.USER + '/profile/update/' + this.data.id, {user: this.userInfo, patient: this.patientInfo})
      .subscribe((res: any) => {
        if (!res.token) {
          this.showVerifyForm = true;
        } else {
          this.authService.resetToken(res.token);
          this.close();
        }
      });
  }

  verify = () => {
    if (this.verifyForm.invalid) {
      return;
    }
    this.httpService.update(URL_JSON.USER + '/profile/verify_phone_number/' + this.data.id, {
      user: this.userInfo,
      patient: this.patientInfo,
      code: this.vf.code.value
    }).subscribe((res: any) => {
      if (res.token) {
        this.authService.resetToken(res.token);
        this.showVerifyForm = false;
      }
      this.close();
    });
  }
}
