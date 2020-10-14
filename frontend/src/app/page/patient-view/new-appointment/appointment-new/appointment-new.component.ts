import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.scss']
})
export class AppointmentNewComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AppointmentNewComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
