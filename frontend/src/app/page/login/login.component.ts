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
  }

  get f(): any {
    return this.loginForm.controls;
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
          }
          this.f.password.setValue(null);
        },
        error => {
          this.error = error.error.message;
        }
      );
    }
  }

}
