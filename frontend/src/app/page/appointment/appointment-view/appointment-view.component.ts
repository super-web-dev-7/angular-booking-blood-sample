import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  isShowPatient = false;
  isShowSchedule = false;
  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close();
  }

  onSubmit = () => {
    this.dialogRef.close();
    this.router.navigateByUrl('/appointment/new');
  }
}
