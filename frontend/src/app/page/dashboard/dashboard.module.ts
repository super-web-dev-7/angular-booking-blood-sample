import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        RouterModule,
    ]
})
export class DashboardModule { }
