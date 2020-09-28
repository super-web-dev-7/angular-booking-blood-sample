import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {MustMatch} from '../../../shared/confirm-password.validator';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  isAppointmentPopup = false;
  isPatientPopup = false;
  selectedDoctors = [];
  selectedGroup = null;
  doctors = [];
  groups = [];
  groupForm: FormGroup;
  patientForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'time-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/time.svg')
    );
  }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
    });
    this.patientForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      street: [null, Validators.required],
      plz: [null, Validators.required],
      ort: [null, Validators.required],
      salutation: [null, Validators.required],
      age: [null, Validators.required],
      gender: [null, Validators.required],
      differentPlace: [false, Validators.required],
      customerStore: [false, Validators.required],
      alternative: [false, Validators.required],
      sendSMS: [false, Validators.required],
      otherStreet: [null],
      otherPostalCode: [null],
      otherCity: [null]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
    this.httpService.get(URL_JSON.USER + '/get?role=Doctor').subscribe((res: any) => {
      this.doctors = res;
    });
    this.httpService.get(URL_JSON.GROUP + '/get').subscribe((res: any) => {
      this.groups = res;
    });
    this.selectedGroup = this.data ? this.data?.calendar_id : 0;
    this.selectedDoctors = this.data ? this.data?.admin : [];
    // this.dialogHeight = this.formView.nativeElement.offsetHeight;
  }

  get f(): any {
    return this.groupForm.controls;
  }

  get pf(): any {
    return this.patientForm.controls;
  }

  showAppointmentPopup = () => {
    this.isAppointmentPopup = !this.isAppointmentPopup;
    this.isPatientPopup = false;
  }

  showPatientPopup = () => {
    this.isPatientPopup = !this.isPatientPopup;
    this.isAppointmentPopup = false;
  }

  selectAdmin = (id) => {
    if (this.selectedDoctors.includes(id)) {
      this.selectedDoctors.splice(this.selectedDoctors.indexOf(id), 1);
    } else {
      this.selectedDoctors.push(id);
    }
  }

  selectCalendar = (id) => {
    this.selectedGroup = id;
  }

  changeCheckboxValue = (item) => {
    this.pf[item].setValue(!this.pf[item].value);
    if (item === 'differentPlace') {
      if (this.pf[item].value) {
        this.pf.otherStreet.setValidators([Validators.required]);
        this.pf.otherPostalCode.setValidators([Validators.required]);
        this.pf.otherCity.setValidators([Validators.required]);
      } else {
        this.pf.otherStreet.setValidators(null);
        this.pf.otherPostalCode.setValidators(null);
        this.pf.otherCity.setValidators(null);
      }
      this.pf.otherStreet.updateValueAndValidity();
      this.pf.otherPostalCode.updateValueAndValidity();
      this.pf.otherCity.updateValueAndValidity();
    }
  }

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.f.password.setValue(password);
    this.f.confirmPassword.setValue(password);
  }

  close = () => {
    this.dialogRef.close();
  }

  onSubmit = () => {
    if (this.groupForm.invalid) {
      return;
    }
    if (!this.selectedDoctors && !this.selectedGroup) {
      return;
    }
    // const data = {
    //   name: this.f.name.value,
    //   isActive: this.f.isActive.value,
    //   admin: JSON.stringify(this.selectedDoctors),
    //   calendar_id: this.selectedGroup
    // };
    // if (this.data) {
    //   this.httpService.update(URL_JSON.GROUP + '/update/' + this.data.id, data).subscribe((result) => {
    //     this.dialogRef.close(result[0]);
    //   });
    // } else {
    //   this.httpService.create(URL_JSON.GROUP, data).subscribe(res => {
    //     this.dialogRef.close();
    //   });
    // }
  }

}
