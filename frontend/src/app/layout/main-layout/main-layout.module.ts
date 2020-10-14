import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MaterialModule} from '../../material/material.module';
import {MainLayoutComponent} from './main-layout.component';
import {PatientViewModule} from '../../page/patient-view/patient-view.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PatientViewModule,
  ]
})
export class MainLayoutModule { }
