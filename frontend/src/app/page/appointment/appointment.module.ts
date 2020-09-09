import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import { OpenDatesComponent } from './open-dates/open-dates.component';
import { NewComponent } from './new/new.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {AppointmentRoutingModule} from './appointment-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {DatetimePickerComponent} from '../../components/datetime-picker/datetime-picker.component';


@NgModule({
  declarations: [OpenDatesComponent, NewComponent, StatisticsComponent, DatetimePickerComponent],
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
