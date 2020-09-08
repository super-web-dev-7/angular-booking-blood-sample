import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../guard/role.guard';
import {OpenDatesComponent} from './open-dates/open-dates.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  {
    path: 'open-dates',
    component: OpenDatesComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  },
  {
    path: 'confirmed',
    component: OpenDatesComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  },
  {
    path: 'canceled',
    component: OpenDatesComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  },
  {
    path: 'completed',
    component: OpenDatesComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  },
  {
    path: 'new',
    component: OpenDatesComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AppointmentRoutingModule { }
