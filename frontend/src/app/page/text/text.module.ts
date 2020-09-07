import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

import {OverviewComponent} from './overview/overview.component';
import {NewComponent} from './new/new.component';
import {TextRoutingModule} from './text-routing.module';
import {MaterialModule} from '../../material/material.module';

import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [OverviewComponent, NewComponent],
  imports: [
    CommonModule,
    TextRoutingModule,
    MaterialModule,
    RouterModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TextModule {
}
