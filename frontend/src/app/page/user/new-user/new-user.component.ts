import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  selectedAllocation = null;
  selectedRole = null;
  allocations = [];
  roles = [
    {
      id: 1,
      name: 'Superadmin'
    },
    {
      id: 2,
      name: 'AG-Admin'
    },
    {
      id: 3,
      name: 'Nurse'
    },
    {
      id: 4,
      name: 'Doctor'
    }
  ];

  userForm: FormGroup;

  password;
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      email: [this.data?.email, Validators.required],
      phoneNumber: [this.data?.phoneNumber, Validators.required],
      password: [null, Validators.required],
      isActive: [this.data ? this.data?.isActive : false, Validators.required]
    });
    this.selectedAllocation = this.data?.working_group ? this.data.working_group.id : 0;
    this.selectedRole = this.data ? this.roles.findIndex(item => item.name === this.data.role) + 1 : null;
    this.httpService.get(URL_JSON.GROUP + '/get').subscribe((res: any) => {
      console.log(res);
      this.allocations = res;
      this.allocations.unshift({
        id: 0,
        name: 'Keine'
      });
    });
  }

  get f() {
    return this.userForm.controls;
  }

  selectAllocation = (id) => {
    this.selectedAllocation = id;
  }

  selectRole = (id) => {
    this.selectedRole = id;
  }

  generateRandomPassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.userForm.controls.password.setValue(password);
  }

  createUser = () => {
    if (this.userForm.invalid) {
      console.log('invalid');
      return;
    }
    if ((!this.selectedAllocation && this.selectedAllocation !== 0) || !this.selectedRole) {
      console.log('unselect');
      return;
    }
    const data = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      phoneNumber: this.f.phoneNumber.value,
      password: this.f.password.value,
      isActive: this.f.isActive.value,
      role: this.roles[this.selectedRole - 1].name,
      allocation: this.selectedAllocation
    };
    if (this.data) {
      this.httpService.update(URL_JSON.USER + '/update/' + this.data.id, data).subscribe(res => {
        const response = Object.assign(data, {id: this.data.id});
        this.dialogRef.close(response);
      });
    } else {
      this.httpService.create(URL_JSON.USER, data).subscribe(res => {
        console.log(res);
        this.dialogRef.close(res);
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }
}
