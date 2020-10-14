import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

import {NgCircleProgressModule} from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {JwtInterceptor} from './helper';

import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AuthComponent } from './layout/auth/auth.component';

import {MaterialModule} from './material/material.module';
import {MainLayoutModule} from './layout/main-layout/main-layout.module';
import {PatientLayoutModule} from './layout/patient-layout/patient-layout.module';
import {SharedModule} from './shared/shared.module';
import { AgDashboardComponent } from './page/ag-dashboard/ag-dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import {DoctorLayoutModule} from './layout/doctor-layout/doctor-layout.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AgDashboardComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MainLayoutModule,
    PatientLayoutModule,
    DoctorLayoutModule,
    SharedModule,
    NgCircleProgressModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
    exports: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
