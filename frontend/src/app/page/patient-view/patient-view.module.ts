import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PatientViewRoutingModule} from './patient-view-routing.module';
import {MaterialModule} from '../../material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PatientViewRoutingModule
  ]
})
export class PatientViewModule { }
