import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {newArray} from '@angular/compiler/src/util';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  isAddAdminPopup = false;
  selectedAdmin = [];
  selectedCalendar = null;
  admins = [];
  calendars = [];
  groupForm: FormGroup;
  values = newArray(48);
  nurses = [];
  selectedNurse = null;
  allAgency = [];
  selectedAgency = null;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      isActive: [this.data ? this.data?.isActive : false, Validators.required],
      duration_appointment: [this.data?.duration_appointment, Validators.required],
      rest_time: [this.data?.rest_time, Validators.required],
      working_time_until: [this.data?.working_time_until, Validators.required],
      working_time_from: [this.data?.working_time_from, Validators.required]
    });
    this.httpService.get(URL_JSON.USER + '/get?role=AG-Admin').subscribe((res: any) => {
      this.admins = res;
    });
    this.httpService.get(URL_JSON.CALENDAR + '/get').subscribe((res: any) => {
      this.calendars = res;
    });
    this.httpService.get(URL_JSON.USER + '/get?role=Nurse').subscribe((res: any) => {
      this.nurses = res;
    });
    this.httpService.get(URL_JSON.AGENCY + '/get').subscribe((res: any) => {
      this.allAgency = res;
    });

    this.selectedCalendar = this.data ? this.data?.calendar_id : 0;
    this.selectedAdmin = this.data ? this.data?.admin : [];
    this.selectedNurse = this.data?.nurse;
    this.selectedAgency = this.data?.agency;
  }

  get f() {
    return this.groupForm.controls;
  }

  getFloor = (value) => {
    return Math.floor(value);
  }

  selectAgency = id => {
    this.selectedAgency = id;
  }

  showAddAdminPopup = (event) => {
    this.isAddAdminPopup = !this.isAddAdminPopup;
  }

  selectNurse = (id) => {
    this.selectedNurse = id;
  }

  selectAdmin = (id) => {
    if (this.selectedAdmin.includes(id)) {
      this.selectedAdmin.splice(this.selectedAdmin.indexOf(id), 1);
    } else {
      this.selectedAdmin.push(id);
    }
  }

  selectCalendar = (id) => {
    this.selectedCalendar = id;
  }

  close = () => {
    this.dialogRef.close();
  }

  onSubmit = () => {
    if (this.groupForm.invalid) {
      return;
    }
    if (!this.selectedAdmin || !this.selectedCalendar || !this.selectedNurse) {
      return;
    }
    const data = {
      name: this.f.name.value,
      isActive: this.f.isActive.value,
      duration_appointment: this.f.duration_appointment.value,
      rest_time: this.f.rest_time.value,
      working_time_from: this.f.working_time_from.value,
      working_time_until: this.f.working_time_until.value,
      admin: JSON.stringify(this.selectedAdmin),
      calendar_id: this.selectedCalendar,
      nurse: this.selectedNurse,
      agency_id: this.selectedAgency
    };
    if (this.data) {
      this.httpService.update(URL_JSON.GROUP + '/update/' + this.data.id, data).subscribe((result) => {
        this.dialogRef.close(result[0]);
      });
    } else {
      this.httpService.create(URL_JSON.GROUP, data).subscribe(res => {
        this.dialogRef.close();
      });
    }
  }
}
