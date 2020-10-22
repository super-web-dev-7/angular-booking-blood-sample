import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PatientViewRoutingModule} from './patient-view-routing.module';
import {MaterialModule} from '../../material/material.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { CancelAppointmentComponent } from './patient-dashboard/cancel-appointment/cancel-appointment.component';
import { MoveAppointmentComponent } from './patient-dashboard/move-appointment/move-appointment.component';
import { EditAnamnesisComponent } from './patient-dashboard/edit-anamnesis/edit-anamnesis.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { ChangePackageComponent } from './patient-dashboard/change-package/change-package.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { CallbackDoctorComponent } from './patient-dashboard/callback-doctor/callback-doctor.component';
import { CallSisterComponent } from './patient-dashboard/call-sister/call-sister.component';
import { PaymentStatusComponent } from './patient-dashboard/payment-status/payment-status.component';
import { AppointmentNewComponent } from './new-appointment/appointment-new/appointment-new.component';
import { AppointmentHistoryComponent } from './patient-dashboard/appointment-history/appointment-history.component';
import { PatientSidebarComponent } from './patient-sidebar/patient-sidebar.component';
import { EditProfileComponent } from './patient-sidebar/edit-profile/edit-profile.component';
import { PopupCancelAppointmentComponent } from './tablet/popup-cancel-appointment/popup-cancel-appointment.component';
import { PopupShiftScheduleComponent } from './tablet/popup-shift-schedule/popup-shift-schedule.component';
import { PopupEditAnamnesComponent } from './tablet/popup-edit-anamnes/popup-edit-anamnes.component';
import { PopupChangePackageComponent } from './tablet/popup-change-package/popup-change-package.component';
import { PopupCallbackDoctorComponent } from './tablet/popup-callback-doctor/popup-callback-doctor.component';
import { PopupCallSisterComponent } from './tablet/popup-call-sister/popup-call-sister.component';
import { PopupPaymentStatusComponent } from './tablet/popup-payment-status/popup-payment-status.component';
import { PopupNewAppointmentComponent } from './tablet/popup-new-appointment/popup-new-appointment.component';
import { PopupArrangeAppointmentComponent } from './tablet/popup-arrange-appointment/popup-arrange-appointment.component';
import { PopupHistoryComponent } from './tablet/popup-history/popup-history.component';
import {AppointmentModule} from '../appointment/appointment.module';
import { DialogSuccessComponent } from './patient-dashboard/dialog-success/dialog-success.component';



@NgModule({
    declarations: [
        PatientDashboardComponent,
        CancelAppointmentComponent,
        MoveAppointmentComponent,
        EditAnamnesisComponent,
        ChangePackageComponent,
        NewAppointmentComponent,
        CallbackDoctorComponent,
        CallSisterComponent,
        PaymentStatusComponent,
        AppointmentNewComponent,
        AppointmentHistoryComponent,
        PatientSidebarComponent,
        EditProfileComponent,
        PopupCancelAppointmentComponent,
        PopupShiftScheduleComponent,
        PopupEditAnamnesComponent,
        PopupChangePackageComponent,
        PopupCallbackDoctorComponent,
        PopupCallSisterComponent,
        PopupPaymentStatusComponent,
        PopupNewAppointmentComponent,
        PopupArrangeAppointmentComponent,
        PopupHistoryComponent,
        DialogSuccessComponent
    ],
    exports: [
        PatientSidebarComponent,
        PopupCancelAppointmentComponent,
        PopupCallSisterComponent,
        PopupCallbackDoctorComponent,
        PopupChangePackageComponent,
        PopupEditAnamnesComponent,
        PopupPaymentStatusComponent,
        PopupShiftScheduleComponent,
        PopupNewAppointmentComponent,
        PopupArrangeAppointmentComponent,
        PopupHistoryComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        PatientViewRoutingModule,
        NgxMatSelectSearchModule,
        AppointmentModule
    ]
})
export class PatientViewModule { }
