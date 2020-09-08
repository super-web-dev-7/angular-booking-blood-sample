import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenDatesComponent } from './open-dates/open-dates.component';
import { NewComponent } from './new/new.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {AppointmentRoutingModule} from './appointment-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [OpenDatesComponent, NewComponent, StatisticsComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AppointmentModule { }
