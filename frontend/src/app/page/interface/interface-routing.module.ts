import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {InterfaceComponent} from './interface.component';


const routes: Routes = [
  {
    path: '',
    component: InterfaceComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class InterfaceRoutingModule { }
