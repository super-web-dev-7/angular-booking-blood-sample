import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { OverviewComponent } from './overview/overview.component';
import {SmsRoutingModule} from './sms-routing.module';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [OverviewComponent, ViewComponent],
  imports: [
    CommonModule,
    SmsRoutingModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [ViewComponent]
})
export class SmsModule { }
