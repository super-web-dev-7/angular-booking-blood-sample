import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {URL_JSON} from '../../utils/url_json';
import {MustMatch} from '../../shared/confirm-password.validator';
import {HttpService} from '../../service/http/http.service';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  verifyForm: FormGroup;
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{11,13}$';
  currentUser: any;
  showVerifyForm = false;
  error: any = null;
  userInfo: any;

  constructor(
    private dialogRef: MatDialogRef<ProfileComponent>,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      email: [this.data?.email, [Validators.required, Validators.email]],
      phoneNumber: [this.data?.phoneNumber, [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
    this.verifyForm = this.formBuilder.group({
      code: [null, Validators.required]
    });
  }

  get f(): any {
    return this.profileForm.controls;
  }

  get vf(): any {
    return this.verifyForm.controls;
  }

  generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    this.f.password.setValue(password);
    this.f.confirmPassword.setValue(password);
  }

  submit = () => {
    if (this.profileForm.invalid) {
      return;
    }
    this.userInfo = {
      email: this.f.email.value,
      phoneNumber: this.f.phoneNumber.value,
      password: this.f.password.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value
    };
    this.httpService.update(URL_JSON.USER + '/profile/update/' + this.data.id, {user: this.userInfo})
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
      code: this.vf.code.value
    }).subscribe((res: any) => {
      if (res.token) {
        this.authService.resetToken(res.token);
        this.showVerifyForm = false;
      }
      this.close();
    });
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
