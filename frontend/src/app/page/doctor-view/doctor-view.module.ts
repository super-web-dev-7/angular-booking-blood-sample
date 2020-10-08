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
import { SearchModalComponent } from './doctor-dashboard/search-modal/search-modal.component';
import { AnswerInquiryComponent } from './doctor-dashboard/answer-inquiry/answer-inquiry.component';
import { PatinetInquiryComponent } from './doctor-dashboard/patinet-inquiry/patinet-inquiry.component';
import { AnamnesReleaseComponent } from './doctor-dashboard/anamnes-release/anamnes-release.component';
import { EventComponent } from './doctor-dashboard/event/event.component';
import { AnamnesViewComponent } from './doctor-dashboard/anamnes-release/anamnes-view/anamnes-view.component';
import { AnamnesCheckComponent } from './doctor-dashboard/anamnes-release/anamnes-check/anamnes-check.component';



@NgModule({
  declarations: [
    DoctorDashboardComponent,
    LaboratoryReportComponent,
    ArchiveComponent,
    SearchModalComponent,
    AnswerInquiryComponent,
    PatinetInquiryComponent,
    AnamnesReleaseComponent,
    EventComponent,
    AnamnesViewComponent,
    AnamnesCheckComponent
  ],
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
