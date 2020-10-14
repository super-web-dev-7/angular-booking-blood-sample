import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-callback-doctor',
  templateUrl: './callback-doctor.component.html',
  styleUrls: ['./callback-doctor.component.scss']
})
export class CallbackDoctorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CallbackDoctorComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
