import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AgDashboardComponent} from './ag-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AgDashboardComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AgDashboardRoutingModule { }
