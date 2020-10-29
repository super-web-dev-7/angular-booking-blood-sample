import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {HttpService} from '../../service/http/http.service';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss']
})
export class SmsVerificationComponent implements OnInit {
  public verificationForm: FormGroup;
  error;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.verificationForm = this.formBuilder.group({
      code: [null, Validators.required]
    });
  }

  get f(): any {
    return this.verificationForm.controls;
  }

  submit = () => {
    if (this.verificationForm.invalid) {
      return;
    }
    const data = {
      email: '',
      code: this.f.code.value
    };
    // this.authService.verifyCode(data).subscribe((res: any) => {
    //   console.log(res);
    // });
  }

}
