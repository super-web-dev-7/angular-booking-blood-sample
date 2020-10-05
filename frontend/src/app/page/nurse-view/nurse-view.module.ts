import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {NurseViewRoutingModule} from './nurse-view-routing.module';
import {MaterialModule} from '../../material/material.module';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';

@NgModule({
  declarations: [
    NurseDashboardComponent,
  ],
  imports: [
    CommonModule,
    NurseViewRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class NurseViewModule { }
