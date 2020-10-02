import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../service/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  isAddAdminPopup = false;
  selectedDoctors = [];
  selectedGroup = null;
  doctors = [];
  groups = [];
  agencyForm: FormGroup;
  newUserForm: FormGroup;
  error = null;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.agencyForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
    });

    this.newUserForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.httpService.get(URL_JSON.USER + '/get?role=Doctor').subscribe((res: any) => {
      this.doctors = res;
    });
    this.httpService.get(URL_JSON.GROUP + '/get_unused').subscribe((res: any) => {
      this.groups = res;
      if (this.data) {
        this.groups.unshift(this.data.working_group);
      }
    });
    this.selectedGroup = this.data ? this.data?.group_id : 0;
    this.selectedDoctors = this.data ? this.data?.doctors_id : [];
  }

  get f(): any {
    return this.agencyForm.controls;
  }

  get getUser(): any {
    return this.newUserForm.controls;
  }

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.newUserForm.controls.password.setValue(password);
  }

  addDoctor = () => {
    if (this.newUserForm.invalid) {
      return;
    }
    this.isAddAdminPopup = !this.isAddAdminPopup;
    const data = {
      firstName: this.getUser.firstName.value,
      lastName: this.getUser.lastName.value,
      email: this.getUser.email.value,
      password: this.getUser.password.value,
      role: 'Doctor',
      isActive: true
    };
    this.httpService.create(URL_JSON.USER, data).subscribe(res => {
      this.doctors.push(res);
    });
  }

  selectAdmin = (id) => {
    if (this.selectedDoctors.includes(id)) {
      this.selectedDoctors.splice(this.selectedDoctors.indexOf(id), 1);
    } else {
      this.selectedDoctors.push(id);
    }
  }

  selectGroup = (id) => {
    this.selectedGroup = id;
  }

  close = () => {
    this.dialogRef.close();
  }

  onSubmit = () => {
    if (this.agencyForm.invalid) {
      return;
    }
    if (!this.selectedDoctors) {
      return;
    }

    const data = {
      name: this.f.name.value,
      doctors_id: this.selectedDoctors,
      group_id: this.selectedGroup
    };
    if (this.data) {
      this.httpService.update(URL_JSON.AGENCY + '/update/' + this.data.id, data).subscribe(result => {
        this.dialogRef.close(result);
      });
    } else {
      this.httpService.create(URL_JSON.AGENCY, data).subscribe(() => {
        this.error = null;
        this.dialogRef.close();
      }, error => {
        this.error = error.error.message;
      });
    }
  }

}
