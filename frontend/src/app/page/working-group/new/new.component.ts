import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {AuthService} from '../../../service/auth/auth.service';


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
  userForm: FormGroup;
  // allAgency = [];
  // selectedAgency = null;
  currentUser;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.groupForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      isActive: [this.data ? this.data?.isActive : false, Validators.required]
    });
    this.userForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
    this.httpService.get(URL_JSON.USER + '/getWorkingGroup').subscribe((res: any) => {
      this.admins = res;
      if (this.data) {
        this.admins = [...this.data.admins, ...this.admins];
      }
    });
    this.httpService.get(URL_JSON.CALENDAR + '/get_unused').subscribe((res: any) => {
      this.calendars = res;
      if (this.data) {
        console.log(this.data);
        this.calendars.unshift(this.data.calendar);
      }
    });
    // this.httpService.get(URL_JSON.AGENCY + '/get/unused').subscribe((res: any) => {
    //   this.allAgency = res;
    //   if (this.data) {
    //     this.allAgency.unshift(this.data.agency);
    //   }
    // });

    this.selectedCalendar = this.data ? this.data?.calendar_id : 0;
    this.selectedAdmin = this.data ? this.data?.admin : [];
    // this.selectedAgency = this.data?.agency.id;
  }

  get f(): any {
    return this.groupForm.controls;
  }

  get uf(): any {
    return this.userForm.controls;
  }

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.userForm.controls.password.setValue(password);
  }

  // selectAgency = id => {
  //   this.selectedAgency = id;
  // }

  showAddAdminPopup = () => {
    if (this.isAddAdminPopup) {
      this.createNewAdmin();
    } else {
      this.isAddAdminPopup = !this.isAddAdminPopup;
    }
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

  createNewAdmin = () => {
    if (this.userForm.invalid) {
      return;
    }
    const data = {
      firstName: this.uf.firstName.value,
      lastName: this.uf.lastName.value,
      email: this.uf.email.value,
      password: this.uf.password.value,
      role: 'AG-Admin',
      isActive: 1
    };
    this.httpService.create(URL_JSON.USER, data).subscribe(res => {
      this.admins.push(res);
      this.isAddAdminPopup = !this.isAddAdminPopup;
    });
  }

  onSubmit = () => {
    if (this.groupForm.invalid) {
      return;
    }
    if (!this.selectedAdmin || !this.selectedCalendar) {
      return;
    }
    const data = {
      name: this.f.name.value,
      isActive: this.f.isActive.value,
      admin: JSON.stringify(this.selectedAdmin),
      calendar_id: this.selectedCalendar,
      // agency_id: this.selectedAgency
    };
    if (this.data) {
      this.httpService.update(URL_JSON.GROUP + '/update/' + this.data.id, data).subscribe((result) => {
        this.dialogRef.close(result);
      });
    } else {
      this.httpService.create(URL_JSON.GROUP, data).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
