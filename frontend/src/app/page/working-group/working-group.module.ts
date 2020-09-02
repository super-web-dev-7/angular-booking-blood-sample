import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {WorkingGroupRoutingModule} from './working-group-routing.module';
import {NewComponent} from './new/new.component';
import {MaterialModule} from '../../material/material.module';



@NgModule({
  declarations: [
    NewComponent
  ],
    imports: [
        CommonModule,
        WorkingGroupRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class WorkingGroupModule {
}
