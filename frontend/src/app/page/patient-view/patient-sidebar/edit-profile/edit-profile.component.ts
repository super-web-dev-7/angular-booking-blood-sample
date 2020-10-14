import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../service/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {userMockData} from '../../../../utils/mock_data';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currentUser: any;
  profileForm: FormGroup;
  dataSource: any;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSource = userMockData;
    this.profileForm = this.formBuilder.group({
      email: [this.dataSource?.email, Validators.required],
      phone: [this.dataSource?.phone, Validators.required],
      password: [this.dataSource?.password, Validators.required],
      mr: [this.dataSource?.mr, Validators.required],
      firstName: [this.dataSource.firstName, Validators.required],
      lastName: [this.dataSource.lastName, Validators.required],
    });
  }

}
