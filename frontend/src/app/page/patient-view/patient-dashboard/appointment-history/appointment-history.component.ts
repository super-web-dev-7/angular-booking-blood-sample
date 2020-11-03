import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

import {URL_JSON} from '../../../../utils/url_json';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss']
})
export class AppointmentHistoryComponent implements OnInit {
  historyData: any;
  appointmentData: any;
  currentUser: any;
  expandedId = null;
  constructor(
    private dialogRef: MatDialogRef<AppointmentHistoryComponent>,
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.DOCTOR + '/getContactHistory/' + this.data?.appointmentId).subscribe((res: any) => {
      if (res) {
        this.appointmentData = res.appointment[0];
        this.historyData = res.contactHistory;
      }
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  formatTime = (time) => {
    if (!time) {
      return '';
    }
    return moment(time).format('DD.MM.YYYY HH:mm');
  }

  close = () => {
    this.dialogRef.close(false);
  }
}
