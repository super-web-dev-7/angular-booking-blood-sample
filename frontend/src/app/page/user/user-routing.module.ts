import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {UserOverviewComponent} from './user-overview/user-overview.component';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {RoleGuard} from '../../guard/role.guard';

const routes: Routes = [
  {
    path: 'overview',
    component: UserOverviewComponent
  },
  {
    path: 'new',
    component: UserOverviewComponent
  },
  {
    path: 'new-patient',
    component: UserOverviewComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['AG-Admin']
    }
  }
];

@NgModule({
  declarations: [UserOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})

export class UserRoutingModule {
}
