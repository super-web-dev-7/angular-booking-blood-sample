import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class CancelAppointmentComponent implements OnInit {
  showMessage: boolean;
  success = false;
  cancelForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CancelAppointmentComponent>
  ) { }

  ngOnInit(): void {
    this.showMessage = false;
    this.cancelForm = this.formBuilder.group({
      message: ['']
    });
  }

  openMessage = () => {
    this.showMessage = !this.showMessage;
  }

  submit = () => {
    this.success = true;
  }

  get f(): any {
    return this.cancelForm.controls;
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
