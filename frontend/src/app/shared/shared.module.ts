import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderIconComponent} from '../components/order-icon/order-icon.component';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [OrderIconComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    OrderIconComponent
  ],
  entryComponents: [OrderIconComponent]
})
export class SharedModule { }
