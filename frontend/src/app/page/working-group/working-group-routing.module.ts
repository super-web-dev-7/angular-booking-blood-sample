import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {WorkingGroupComponent} from './working-group.component';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {RoleGuard} from '../../guard/role.guard';

const routes: Routes = [
  {
    path: 'overview',
    component: WorkingGroupComponent
  },
  {
    path: 'new',
    component: WorkingGroupComponent,
    canActivate: [RoleGuard],
    data: {
      userRole: ['Superadmin']
    }
  }
];

@NgModule({
  declarations: [WorkingGroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class WorkingGroupRoutingModule {
}
