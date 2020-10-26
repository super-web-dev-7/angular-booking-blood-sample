import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

import {DoctorViewRoutingModule} from './doctor-view-routing.module';
import {MaterialModule} from '../../material/material.module';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {LaboratoryReportComponent} from './laboratory-report/laboratory-report.component';
import {ArchiveComponent} from './archive/archive.component';
import {SearchModalComponent} from './doctor-dashboard/search-modal/search-modal.component';
import {AnswerInquiryComponent} from './doctor-dashboard/answer-inquiry/answer-inquiry.component';
import {PatinetInquiryComponent} from './doctor-dashboard/patinet-inquiry/patinet-inquiry.component';
import {AnamnesReleaseComponent} from './doctor-dashboard/anamnes-release/anamnes-release.component';
import {EventComponent} from './doctor-dashboard/event/event.component';
import {AnamnesViewComponent} from './doctor-dashboard/anamnes-release/anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './doctor-dashboard/anamnes-release/anamnes-check/anamnes-check.component';
import {ViewAppointmentComponent} from './doctor-dashboard/event/view-appointment/view-appointment.component';
import {SuccessDialogComponent} from './doctor-dashboard/answer-inquiry/success-dialog/success-dialog.component';
import {ArchivePatientComponent} from './archive/archive-patient/archive-patient.component';
import {ArchiveAnamnesComponent} from './archive/archive-anamnes/archive-anamnes.component';
import {ArchiveEventComponent} from './archive/archive-event/archive-event.component';
import {RightSidebarComponent} from './right-sidebar/right-sidebar.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import {SidePatientInquiryComponent} from './tablet/side-patient-inquiry/side-patient-inquiry.component';
import {MedicalHistoryLeftComponent} from './doctor-dashboard/answer-inquiry/left-popup/medical-history-left/medical-history-left.component';
import {ContactHistoryLeftComponent} from './doctor-dashboard/answer-inquiry/left-popup/contact-history-left/contact-history-left.component';
import {PatientRecallComponent} from './doctor-dashboard/answer-inquiry/left-popup/patient-recall/patient-recall.component';
import {ViewContactHistoryComponent} from './doctor-dashboard/anamnes-release/anamnes-check/view-contact-history/view-contact-history.component';
import {CallPatientComponent} from './doctor-dashboard/anamnes-release/anamnes-check/call-patient/call-patient.component';
import {SidePatientAnswerComponent} from './tablet/side-patient-answer/side-patient-answer.component';
import {SideMedicalHistoryComponent} from './tablet/side-medical-history/side-medical-history.component';
import {SideCheckAnamnesComponent} from './tablet/side-check-anamnes/side-check-anamnes.component';
import {SideViewAppointmentComponent} from './tablet/side-view-appointment/side-view-appointment.component';
import {LeftAnamneseComponent} from './tablet/side-patient-answer/left-anamnese/left-anamnese.component';
import {LeftHistoryPopupComponent} from './tablet/side-patient-answer/left-history-popup/left-history-popup.component';
import {LeftRecallComponent} from './tablet/side-patient-answer/left-recall/left-recall.component';
import {LeftMessagePopupComponent} from './tablet/side-patient-answer/left-message-popup/left-message-popup.component';
import {SearchInputComponent} from './doctor-dashboard/search-input/search-input.component';
import {environment} from '../../../environments/environment';

const config: SocketIoConfig = {url: 'http://localhost:7000/', options: {}};

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    LaboratoryReportComponent,
    ArchiveComponent,
    SearchModalComponent,
    AnswerInquiryComponent,
    PatinetInquiryComponent,
    AnamnesReleaseComponent,
    EventComponent,
    AnamnesViewComponent,
    AnamnesCheckComponent,
    ViewAppointmentComponent,
    SuccessDialogComponent,
    ArchivePatientComponent,
    ArchiveAnamnesComponent,
    ArchiveEventComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    SidePatientInquiryComponent,
    MedicalHistoryLeftComponent,
    ContactHistoryLeftComponent,
    PatientRecallComponent,
    ViewContactHistoryComponent,
    CallPatientComponent,
    SidePatientAnswerComponent,
    SideMedicalHistoryComponent,
    SideCheckAnamnesComponent,
    SideViewAppointmentComponent,
    LeftAnamneseComponent,
    LeftHistoryPopupComponent,
    LeftRecallComponent,
    LeftMessagePopupComponent,
    SearchInputComponent,
  ],
  exports: [
    RightSidebarComponent,
    LeftSidebarComponent,
    MedicalHistoryLeftComponent,
    ContactHistoryLeftComponent,
    PatientRecallComponent,
    ViewContactHistoryComponent,
    CallPatientComponent,
    SidePatientInquiryComponent,
    SidePatientAnswerComponent,
    SideMedicalHistoryComponent,
    SideCheckAnamnesComponent,
    SideViewAppointmentComponent,
    LeftHistoryPopupComponent,
    LeftAnamneseComponent,
    LeftRecallComponent,
    LeftMessagePopupComponent
  ],
  imports: [
    CommonModule,
    DoctorViewRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxMatSelectSearchModule,
    CKEditorModule,
    NgxMatDatetimePickerModule,
    SocketIoModule.forRoot(config)
  ]
})
export class DoctorViewModule {
}
