import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DoctorViewRoutingModule} from './doctor-view-routing.module';
import {MaterialModule} from '../../material/material.module';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import { LaboratoryReportComponent } from './laboratory-report/laboratory-report.component';
import { ArchiveComponent } from './archive/archive.component';



@NgModule({
  declarations: [DoctorDashboardComponent, LaboratoryReportComponent, ArchiveComponent],
  imports: [
    CommonModule,
    DoctorViewRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class DoctorViewModule { }
