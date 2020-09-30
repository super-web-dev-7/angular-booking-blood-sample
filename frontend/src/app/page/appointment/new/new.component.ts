import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {MustMatch} from '../../../shared/confirm-password.validator';
import * as moment from "moment";


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  isAppointmentPopup = false;
  isPatientPopup = false;
  selectedAgency = null;
  selectedPackage = null;
  selectedTime = null;
  agencies = [];
  packages = [];
  allTimes = [];
  groupForm: FormGroup;
  patientForm: FormGroup;
  public patientSearchControl = new FormControl();
  allPatient = [];
  allPatient$ = [];
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
    this.httpService.get(URL_JSON.AGENCY + '/get').subscribe((res: any) => {
      this.agencies = res;
    });
    this.httpService.get(URL_JSON.PACKAGE + '/get').subscribe((res: any) => {
      this.packages = res;
    });
    this.httpService.get(URL_JSON.USER + '/get?role=Patient').subscribe((res: any) => {
      this.allPatient = res;
      this.allPatient$ = res;
    });
    this.selectedPackage = this.data ? this.data?.calendar_id : null;
    this.selectedAgency = this.data ? this.data?.agency : null;
    this.patientSearchControl.valueChanges.subscribe(() => {
      console.log('');
      let search = this.patientSearchControl.value;
      search = search.toLowerCase();
      this.allPatient = this.allPatient$.filter(item => (item.firstName + item.lastName).toLowerCase().indexOf(search) > -1);
    });
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

  selectAgency = (agency) => {
    this.selectedAgency = agency.id;
    this.httpService.get(URL_JSON.CALENDAR + '/get/' + agency.working_group.calendar_id).subscribe((res: any) => {
      this.makeAppointmentTime(res);
    });
  }

  makeAppointmentTime = calendar  => {
    this.allTimes = [];
    calendar.working_time_from = this.getMillisecondsFromNumber(calendar.working_time_from);
    calendar.working_time_until = this.getMillisecondsFromNumber(calendar.working_time_until);
    calendar.duration_appointment = calendar.duration_appointment * 60 * 1000;
    calendar.rest_time = calendar.rest_time * 60 * 1000;
    console.log(calendar);
    let time = calendar.working_time_from;
    while ((time + calendar.duration_appointment) < calendar.working_time_until) {
      this.allTimes.push(time);
      time += calendar.duration_appointment + calendar.rest_time;
    }
    for (const item of this.allTimes) {
      console.log(this.getDate(item));
    }
  }

  getDate = time => {
    moment.locale('de');
    return moment(time).format('ddd DD.MM.YYYY hh:mm');
  }

  getMillisecondsFromNumber = (num: any) => {
    const now = new Date();
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      Math.floor(num / 2),
      num % 2 === 0 ? 0 : 30
    );
    return date.getTime();
  }

  selectPackage = (id) => {
    this.selectedPackage = id;
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
    if (!this.selectedAgency && !this.selectedPackage) {
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
