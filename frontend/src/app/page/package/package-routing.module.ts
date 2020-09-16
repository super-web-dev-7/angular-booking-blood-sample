import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {MaterialModule} from '../../material/material.module';
import {OverviewComponent} from './overview/overview.component';
import {OverviewAdditionalComponent} from './overview-additional/overview-additional.component';


const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'new',
    component: OverviewComponent
  },
  {
    path: 'new-additional',
    component: OverviewAdditionalComponent
  },
  {
    path: 'overview-additional',
    component: OverviewAdditionalComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,

  ]
})
export class PackageRoutingModule { }
