import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NurseViewRoutingModule} from './nurse-view-routing.module';
import {MaterialModule} from '../../material/material.module';
import { NurseDashboardComponent } from './nurse-dashboard/nurse-dashboard.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    NurseDashboardComponent,
  ],
    imports: [
        CommonModule,
        NurseViewRoutingModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        CKEditorModule,
    ]
})
export class NurseViewModule { }
