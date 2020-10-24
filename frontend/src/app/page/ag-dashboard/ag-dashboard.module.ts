import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {AgDashboardRoutingModule} from './ag-dashboard-routing.module';
import {AgDashboardComponent} from './ag-dashboard.component';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    AgDashboardComponent
  ],
  imports: [
    CommonModule,
    AgDashboardRoutingModule,
    RouterModule,
    NgCircleProgressModule.forRoot({
    }),
    SharedModule,
    MaterialModule
  ],
  exports: [
  ]
})
export class AgDashboardModule { }
