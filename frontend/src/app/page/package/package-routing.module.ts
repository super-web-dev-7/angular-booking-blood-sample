import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {MaterialModule} from '../../material/material.module';
import {OverviewComponent} from './overview/overview.component';



const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'new',
    component: OverviewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class PackageRoutingModule { }
