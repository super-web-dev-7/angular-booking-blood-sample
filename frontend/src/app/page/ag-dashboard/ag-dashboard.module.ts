import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {AgDashboardRoutingModule} from './ag-dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgDashboardRoutingModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
    })
  ]
})
export class AgDashboardModule { }
