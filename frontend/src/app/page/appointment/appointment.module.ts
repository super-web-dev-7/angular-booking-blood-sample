import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

import { OpenDatesComponent } from './open-dates/open-dates.component';
import { NewComponent } from './new/new.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {AppointmentRoutingModule} from './appointment-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {DatetimePickerComponent} from '../../components/datetime-picker/datetime-picker.component';
import {BarChartComponent} from '../../components/bar-chart/bar-chart.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { ModalMedicalComponent } from './appointment-view/modal-medical/modal-medical.component';


@NgModule({
    declarations: [
        OpenDatesComponent,
        NewComponent,
        StatisticsComponent,
        DatetimePickerComponent,
        BarChartComponent,
        AppointmentViewComponent,
        ModalMedicalComponent
    ],
    exports: [
        DatetimePickerComponent
    ],
    imports: [
        CommonModule,
        AppointmentRoutingModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        NgxChartsModule,
        NgxMatSelectSearchModule,
        FormsModule
    ]
})
export class AppointmentModule { }
