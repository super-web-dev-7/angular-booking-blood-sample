import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { NewComponent } from './new/new.component';

import {MaterialModule} from '../../material/material.module';
import {PackageRoutingModule} from './package-routing.module';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [OverviewComponent, NewComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    MaterialModule,
    RouterModule
  ]
})
export class PackageModule { }
