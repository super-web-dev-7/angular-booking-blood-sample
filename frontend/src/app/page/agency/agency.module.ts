import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import {AgencyRoutingModule} from './agency-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { NewComponent } from './new/new.component';
import {MaterialModule} from '../../material/material.module';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [OverviewComponent, NewComponent],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AgencyModule { }
