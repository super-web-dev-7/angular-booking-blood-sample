import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientLayoutComponent } from './patient-layout.component';
import { SidebarPatientComponent } from './sidebar-patient/sidebar-patient.component';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import {MaterialModule} from '../../material/material.module';
import {RouterModule} from '@angular/router';
import {PatientViewModule} from '../../page/patient-view/patient-view.module';
import { PatientLeftSidebarComponent } from './patient-left-sidebar/patient-left-sidebar.component';



@NgModule({
  declarations: [
    PatientLayoutComponent,
    SidebarPatientComponent,
    PatientHeaderComponent,
    PatientLeftSidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PatientViewModule
  ]
})
export class PatientLayoutModule { }
