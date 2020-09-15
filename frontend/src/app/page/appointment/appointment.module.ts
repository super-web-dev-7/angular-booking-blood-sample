import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { OpenDatesComponent } from './open-dates/open-dates.component';
import { NewComponent } from './new/new.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {AppointmentRoutingModule} from './appointment-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {DatetimePickerComponent} from '../../components/datetime-picker/datetime-picker.component';
import {DonutChartComponent} from '../../components/donut-chart/donut-chart.component';
import {BarChartComponent} from '../../components/bar-chart/bar-chart.component';



@NgModule({
  declarations: [OpenDatesComponent, NewComponent, StatisticsComponent, DatetimePickerComponent, DonutChartComponent, BarChartComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NgxChartsModule
  ]
})
export class AppointmentModule { }