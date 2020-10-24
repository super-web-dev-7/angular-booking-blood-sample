import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {OrderIconComponent} from '../components/order-icon/order-icon.component';
import {MaterialModule} from '../material/material.module';
import {DonutChartComponent} from '../components/donut-chart/donut-chart.component';


@NgModule({
  declarations: [OrderIconComponent, DonutChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderIconComponent,
    DonutChartComponent
  ],
  entryComponents: [OrderIconComponent]
})
export class SharedModule { }
