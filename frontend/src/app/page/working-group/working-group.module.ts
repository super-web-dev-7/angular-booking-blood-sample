import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkingGroupRoutingModule} from './working-group-routing.module';
import {NewComponent} from './new/new.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    WorkingGroupRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MaterialModule
  ]
})
export class WorkingGroupModule {
}
