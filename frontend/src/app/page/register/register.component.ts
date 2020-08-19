import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

import {AuthService} from '../../service/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  error;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [null, Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register = () => {
    if (!this.registerForm.valid) {
      return;
    }
    const userData = {
      email: this.f.email.value.toLowerCase(),
      password: this.f.password.value
    };

    this.authService.register(userData).pipe(first()).subscribe( res => {
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.error = error.error.message;
      console.log(this.error);
    });
  }

}
