import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {UserRoutingModule} from './user-routing.module';
import {NewUserComponent} from './new-user/new-user.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [
    NewUserComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MatSlideToggleModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class UserModule {
}
