import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { NewComponent } from './new/new.component';
import {TextRoutingModule} from './text-routing.module';
import {MaterialModule} from '../../material/material.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [OverviewComponent, NewComponent],
  imports: [
    CommonModule,
    TextRoutingModule,
    MaterialModule,
    RouterModule,
    CKEditorModule,
    FormsModule
  ]
})
export class TextModule { }
