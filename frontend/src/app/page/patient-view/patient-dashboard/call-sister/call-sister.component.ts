import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-call-sister',
  templateUrl: './call-sister.component.html',
  styleUrls: ['./call-sister.component.scss']
})
export class CallSisterComponent implements OnInit {
  displayData: any;
  nurseInfo: any;
  constructor(
    private dialogRef: MatDialogRef<CallSisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithNurseInfo/' + this.data.appointmentId).subscribe((res: any) => {
      this.nurseInfo = res;
      console.log('resssss. res', res);
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
