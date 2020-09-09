import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { OverviewComponent } from './overview/overview.component';
import {SmsRoutingModule} from './sms-routing.module';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    SmsRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SmsModule { }
