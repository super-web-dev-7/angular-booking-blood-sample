import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NurseDashboardComponent} from './nurse-dashboard/nurse-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NurseDashboardComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class NurseViewRoutingModule {
}
