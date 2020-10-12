import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PatientViewRoutingModule} from './patient-view-routing.module';
import {MaterialModule} from '../../material/material.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { CancelAppointmentComponent } from './patient-dashboard/cancel-appointment/cancel-appointment.component';
import { MoveAppointmentComponent } from './patient-dashboard/move-appointment/move-appointment.component';
import { EditAnamnesisComponent } from './patient-dashboard/edit-anamnesis/edit-anamnesis.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { ChangePackageComponent } from './patient-dashboard/change-package/change-package.component';



@NgModule({
  declarations: [
    PatientDashboardComponent,
    CancelAppointmentComponent,
    MoveAppointmentComponent,
    EditAnamnesisComponent,
    ChangePackageComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        PatientViewRoutingModule,
        NgxMatSelectSearchModule
    ]
})
export class PatientViewModule { }
