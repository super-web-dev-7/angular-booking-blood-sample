import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-callback-doctor',
  templateUrl: './callback-doctor.component.html',
  styleUrls: ['./callback-doctor.component.scss']
})
export class CallbackDoctorComponent implements OnInit {
  selectedDay: any;
  times = [
    {time: 'morning', label: 'Vormittags (09:00 - 12:00)'},
    {time: 'noon', label: 'Nachmittags (12:00 - 16:00)'},
    {time: 'evening', label: 'Abends (16:00 - 19:00)'}
  ];
  selectedTime = null;
  isValid = false;
  constructor(
    private dialogRef: MatDialogRef<CallbackDoctorComponent>
  ) { }

  ngOnInit(): void {
    this.selectedDay = null;
  }

  close = () => {
    this.dialogRef.close(false);
  }

  selectDay = (event) => {
    this.selectedDay = event;
  }

}
