import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorLayoutComponent } from './doctor-layout.component';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import {MaterialModule} from '../../material/material.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    DoctorLayoutComponent,
    DoctorSidebarComponent,
    DoctorHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class DoctorLayoutModule { }
