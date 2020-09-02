import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {newArray} from '@angular/compiler/src/util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.scss']
})
export class NewCalendarComponent implements OnInit {
  selectedDistrict = null;
  selectedNurse = null;
  districts = [];
  nurses = [];

  values = newArray(48);
  scheduleForm: FormGroup;

  constructor(
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.DISTRICT + '/get').subscribe((res: any) => {
      this.districts = res;
    });
    this.httpService.get(URL_JSON.USER + '/get?role=Nurse').subscribe((res: any) => {
      this.nurses = res;
    });
    this.scheduleForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      duration_appointment: [this.data?.duration_appointment, Validators.required],
      rest_time: [this.data?.rest_time, Validators.required],
      working_time_until: [this.data?.working_time_until, Validators.required],
      working_time_from: [this.data?.working_time_from, Validators.required]
    });
    this.selectedDistrict = this.data?.district_id;
    this.selectedNurse = this.data?.nurse;
  }

  getFloor = (value) => {
    return Math.floor(value);
  }

  get f() {
    return this.scheduleForm.controls;
  }

  selectDistrict = (id) => {
    this.selectedDistrict = id;
  }

  selectNurse = (id) => {
    this.selectedNurse = id;
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }

  onSubmitForm = () => {
    if (this.scheduleForm.invalid) {
      return;
    }
    if (!this.selectedDistrict || !this.selectedNurse) {
      return;
    }

    const data = {
      name: this.f.name.value,
      duration_appointment: this.f.duration_appointment.value,
      rest_time: this.f.rest_time.value,
      working_time_from: this.f.working_time_from.value,
      working_time_until: this.f.working_time_until.value,
      district_id: this.selectedDistrict,
      nurse: this.selectedNurse
    };
    if (this.data) {
      this.httpService.update(URL_JSON.CALENDAR + '/update/' + this.data.id, data).subscribe(res => {
        this.dialogRef.close(res[0]);
      });
    } else {
      this.httpService.create(URL_JSON.CALENDAR, data).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }
}
