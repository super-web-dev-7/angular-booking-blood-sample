import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../../service/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public verificationForm: FormGroup;
  public showVerifyForm = false;
  error;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [null, Validators.required]
    });

    this.verificationForm = this.formBuilder.group({
      code: [null, Validators.required]
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  get vf(): any {
    return this.verificationForm.controls;
  }

  login = () => {
    if (this.loginForm.valid) {
      this.authService.login(this.f.email.value.toLowerCase(), this.f.password.value).pipe(first()).subscribe(
        res => {
          if (res.role === 'Superadmin') {
            this.router.navigate(['/dashboard']);
          } else if (res.role === 'AG-Admin') {
            this.router.navigate(['/ag-dashboard']);
          } else if (res.role === 'Nurse') {
            this.router.navigate(['/nurse-view']);
          } else if (res.role === 'Doctor') {
            this.router.navigate(['/doctor']);
          } else if (res.role === 'Patient') {
            this.showVerifyForm = true;
            // this.router.navigate(['/sms-verification'], );
          }
          // this.f.password.setValue(null);
        },
        error => {
          console.log(error);
          this.error = error.error.message;
        }
      );
    }
  }

  submit = () => {
    if (this.verificationForm.invalid) {
      return;
    }
    const data = {
      email: this.f.email.value.toLowerCase(),
      password: this.f.password.value,
      code: this.vf.code.value
    };
    this.authService.verifyCode(data).subscribe((res: any) => {
      this.router.navigate(['/patient']);
      this.showVerifyForm = false;
    }, error => {
      console.log(error);
      this.error = error.error.message;
    });
  }
}
