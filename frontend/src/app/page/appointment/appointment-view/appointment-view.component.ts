import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import * as moment from 'moment';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close();
  }

  getDate = time => {
    moment.locale('de');
    return moment(time).format('ddd DD.MM.YYYY HH:mm');
  }

  onSubmit = () => {
    this.dialogRef.close();
    this.router.navigateByUrl('/appointment/new');
  }
}
