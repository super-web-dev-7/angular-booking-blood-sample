import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../material/material.module';
import {PackageRoutingModule} from './package-routing.module';

import {OverviewComponent} from './overview/overview.component';
import {NewComponent} from './new/new.component';
import {SharedModule} from '../../shared/shared.module';
import { NewAdditionalComponent } from './new-additional/new-additional.component';
import { OverviewAdditionalComponent } from './overview-additional/overview-additional.component';

@NgModule({
  declarations: [OverviewComponent, NewComponent, NewAdditionalComponent, OverviewAdditionalComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PackageModule {
}
