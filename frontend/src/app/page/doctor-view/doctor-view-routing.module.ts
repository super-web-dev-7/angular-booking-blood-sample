import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {LaboratoryReportComponent} from './laboratory-report/laboratory-report.component';
import {ArchiveComponent} from './archive/archive.component';
import {PatinetInquiryComponent} from './doctor-dashboard/patinet-inquiry/patinet-inquiry.component';
import {AnamnesReleaseComponent} from './doctor-dashboard/anamnes-release/anamnes-release.component';
import {EventComponent} from './doctor-dashboard/event/event.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorDashboardComponent,
  },
  {
    path: 'dashboard/patient-inquiry',
    component: PatinetInquiryComponent
  },
  {
    path: 'dashboard/anamnes-release',
    component: AnamnesReleaseComponent
  },
  {
    path: 'dashboard/event',
    component: EventComponent
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
