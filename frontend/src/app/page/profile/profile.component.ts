import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../service/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{11,13}$';

  constructor(
    private dialogRef: MatDialogRef<ProfileComponent>,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.pattern(this.phoneNumberPattern)]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  get f(): any {
    return this.profileForm.controls;
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
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
