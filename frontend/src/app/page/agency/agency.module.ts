import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { OverviewComponent } from './overview/overview.component';
import {AgencyRoutingModule} from './agency-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { NewComponent } from './new/new.component';
import {MaterialModule} from '../../material/material.module';



@NgModule({
  declarations: [OverviewComponent, NewComponent],
    imports: [
        CommonModule,
        AgencyRoutingModule,
        SharedModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AgencyModule { }
