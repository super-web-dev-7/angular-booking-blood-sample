import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../service/http/http.service';
import {AuthService} from '../../../service/auth/auth.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MustMatch} from '../../../shared/confirm-password.validator';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  patientForm: FormGroup;
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      salutation: [null, Validators.required],
      street: [null, Validators.required],
      age: [null, Validators.required],
      gender: [null, Validators.required],
      plz: [null, Validators.required],
      ort: [null, Validators.required],
      differentPlace: [false, Validators.required],
      customerStore: [false, Validators.required],
      alternative: [false, Validators.required],
      sendSMS: [false, Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.patientForm.controls;
  }

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.f.password.setValue(password);
    this.f.confirmPassword.setValue(password);
  }

  close = () => {
    this.dialogRef.close();
  }

  createPatient = () => {
    if (this.patientForm.invalid) {
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
      sendSMS: this.f.sendSMS.value
    };
    console.log(data);
    this.httpService.create(URL_JSON.USER + '/patient', data).subscribe(res => {
      console.log(res);
    });
  }

}
