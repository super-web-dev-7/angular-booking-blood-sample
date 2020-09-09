import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../guard/role.guard';
import {OverviewComponent} from './overview/overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
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
export class SmsRoutingModule { }
