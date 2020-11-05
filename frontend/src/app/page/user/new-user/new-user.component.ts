import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {AuthService} from '../../../service/auth/auth.service';



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  selectedRole = null;
  roles = [
    {id: 1, name: 'Superadmin'},
    {id: 2, name: 'AG-Admin'},
    {id: 3, name: 'Nurse'},
    {id: 4, name: 'Doctor'}
  ];

  userForm: FormGroup;
  password;
  currentUser;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    this.userForm = this.formBuilder.group({
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      email: [this.data?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data?.phoneNumber, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{11,13}$')]],
      password: [null, Validators.required],
      isActive: [this.data ? this.data?.isActive : false, Validators.required]
    });
    if (this.currentUser.role === 'AG-Admin') {
      this.roles.splice(0, 2);
    }
    this.selectedRole = this.data ? this.roles[this.roles.findIndex(item => item.name === this.data.role)].id : null;
  }

  get f(): any {
    return this.userForm.controls;
  }

  selectRole = (id) => {
    this.selectedRole = id;
  }

  generateRandomPassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.userForm.controls.password.setValue(password);
  }

  getRoleName = selectedRole => {
    const index = this.roles.findIndex(item => item.id === selectedRole);
    return this.roles[index].name;
  }

  createUser = () => {
    if (this.userForm.invalid) {
      return;
    }

    if (!this.selectedRole) {
      return;
    }
    const data = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      phoneNumber: this.f.phoneNumber.value,
      password: this.f.password.value,
      isActive: this.f.isActive.value,
      role: this.getRoleName(this.selectedRole),
    };
    if (this.data) {
      this.httpService.update(URL_JSON.USER + '/update/' + this.data.id, data).subscribe(() => {
        const response = Object.assign(data, {id: this.data.id});
        this.dialogRef.close(response);
      }, () => {
        this.snackBar.open('Dieser User ist bereits im System vorhanden.', '', {duration: 2000});
      });
    } else {
      this.httpService.create(URL_JSON.USER, data).subscribe(res => {
        this.dialogRef.close(res);
      }, () => {
        this.snackBar.open('Dieser User ist bereits im System vorhanden.', '', {duration: 2000});
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }
}
