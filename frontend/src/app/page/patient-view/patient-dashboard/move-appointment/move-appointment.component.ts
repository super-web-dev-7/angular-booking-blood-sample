import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-move-appointment',
  templateUrl: './move-appointment.component.html',
  styleUrls: ['./move-appointment.component.scss']
})
export class MoveAppointmentComponent implements OnInit {
  moveForm: FormGroup;
  isValid = false;
  allTimes = [];
  selectedPTime = null;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MoveAppointmentComponent>
  ) { }

  ngOnInit(): void {
    this.moveForm = this.formBuilder.group({
      plz: [null, Validators.required],
      ort: [null, Validators.required],
      street: [null, Validators.required],
      message: ['', Validators.required]
    });
  }

  get f(): any {
    return this.moveForm.controls;
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
