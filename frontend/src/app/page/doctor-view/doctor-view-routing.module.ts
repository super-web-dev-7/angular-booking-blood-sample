import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {LaboratoryReportComponent} from './laboratory-report/laboratory-report.component';
import {ArchiveComponent} from './archive/archive.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorDashboardComponent
  },
  {
    path: 'laboratory-report',
    component: LaboratoryReportComponent
  },
  {
    path: 'archive',
    component: ArchiveComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DoctorViewRoutingModule { }
