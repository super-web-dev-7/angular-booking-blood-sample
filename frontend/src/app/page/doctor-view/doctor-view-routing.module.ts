import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {LaboratoryReportComponent} from './laboratory-report/laboratory-report.component';
import {ArchiveComponent} from './archive/archive.component';
import {PatinetInquiryComponent} from './doctor-dashboard/patinet-inquiry/patinet-inquiry.component';
import {AnamnesReleaseComponent} from './doctor-dashboard/anamnes-release/anamnes-release.component';
import {EventComponent} from './doctor-dashboard/event/event.component';
import {ArchivePatientComponent} from './archive/archive-patient/archive-patient.component';
import {ArchiveAnamnesComponent} from './archive/archive-anamnes/archive-anamnes.component';
import {ArchiveEventComponent} from './archive/archive-event/archive-event.component';

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
  },
  {
    path: 'archive/patient-inquiry',
    component: ArchivePatientComponent
  },
  {
    path: 'archive/anamnes-release',
    component: ArchiveAnamnesComponent
  },
  {
    path: 'archive/events',
    component: ArchiveEventComponent
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
