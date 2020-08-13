import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router
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

  login = () => {
    if (this.loginForm.valid) {
      console.log('login');
      this.router.navigate(['/dashboard']);
    }
  }

}
