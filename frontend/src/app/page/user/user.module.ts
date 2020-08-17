import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {NewUserComponent} from './new-user/new-user.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";


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
  ]
})
export class UserModule {
}
