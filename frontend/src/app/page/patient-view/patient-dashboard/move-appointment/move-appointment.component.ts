import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-move-appointment',
  templateUrl: './move-appointment.component.html',
  styleUrls: ['./move-appointment.component.scss']
})
export class MoveAppointmentComponent implements OnInit {
  moveForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.moveForm = this.formBuilder.group({
      zipcode: [''],
      place: [''],
      street: [''],
      message: ['']
    });
  }

  get f(): any {
    return this.moveForm.controls;
  }

}
