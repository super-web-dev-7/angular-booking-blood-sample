import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PatientDashboardComponent} from './patient-dashboard/patient-dashboard.component';
import {NewAppointmentComponent} from './new-appointment/new-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent
  },
  {
    path: 'new_appointment',
    component: PatientDashboardComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PatientViewRoutingModule { }
