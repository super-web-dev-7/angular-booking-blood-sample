import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterfaceComponent } from './interface.component';
import {InterfaceRoutingModule} from './interface-routing.module';
import {MaterialModule} from '../../material/material.module';



@NgModule({
  declarations: [InterfaceComponent],
  imports: [
    CommonModule,
    InterfaceRoutingModule,
    MaterialModule
  ]
})
export class InterfaceModule { }
