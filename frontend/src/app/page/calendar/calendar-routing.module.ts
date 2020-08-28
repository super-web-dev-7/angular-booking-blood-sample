import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {MaterialModule} from '../../material/material.module';
import {CalendarComponent} from './overview/calendar.component';
import {DistrictComponent} from './district/district.component';


const routes: Routes = [
  {
    path: 'overview',
    component: CalendarComponent
  },
  {
    path: 'new',
    component: CalendarComponent
  },
  {
    path: 'district/overview',
    component: DistrictComponent
  },
  {
    path: 'district/new',
    component: DistrictComponent
  }
];

@NgModule({
  declarations: [
    CalendarComponent,
    DistrictComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule
    ]
})
export class CalendarRoutingModule { }
