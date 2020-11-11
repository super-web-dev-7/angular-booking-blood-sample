import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../material/material.module';
import {BookingRoutingModule} from './booking-routing.module';
import {BookingStepFirstComponent} from './booking-step-first/booking-step-first.component';
import {BookingStepSecondComponent} from './booking-step-second/booking-step-second.component';
import {BookingStepThirdComponent} from './booking-step-third/booking-step-third.component';
import {BookingStepFourthComponent} from './booking-step-fourth/booking-step-fourth.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    BookingStepFirstComponent,
    BookingStepSecondComponent,
    BookingStepThirdComponent,
    BookingStepFourthComponent,
  ],
  exports: [
    BookingStepFirstComponent,
    BookingStepSecondComponent,
    BookingStepThirdComponent,
    BookingStepFourthComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BookingRoutingModule,
    SharedModule
  ]
})
export class BookingModule {
}
