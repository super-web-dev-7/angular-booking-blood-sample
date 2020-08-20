import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../material/material.module';
import {PackageRoutingModule} from './package-routing.module';

import { OverviewComponent } from './overview/overview.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [OverviewComponent, NewComponent],
    imports: [
        CommonModule,
        PackageRoutingModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class PackageModule { }
