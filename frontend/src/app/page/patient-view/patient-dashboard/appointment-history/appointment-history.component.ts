import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss']
})
export class AppointmentHistoryComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AppointmentHistoryComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }
}
