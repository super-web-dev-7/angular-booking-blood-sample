import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppointmentNewComponent} from './appointment-new/appointment-new.component';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewAppointmentComponent>
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      zipcode: [this.data?.zipcode, Validators.required],
    });
  }

  newAppointment = () => {
    this.dialogRef.close(true);
  }

}
