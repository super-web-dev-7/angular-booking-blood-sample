import {Component, Inject, OnInit} from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../service/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {URL_JSON} from '../../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-anamnes-view',
  templateUrl: './anamnes-view.component.html',
  styleUrls: ['./anamnes-view.component.scss']
})
export class AnamnesViewComponent implements OnInit {
  displayData: any;

  constructor(
    private sharedService: SharedService,
    public httpService: HttpService,
    private dialogRef: MatDialogRef<AnamnesViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res[0];
      console.log('+++++++++++++', this.displayData);
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  close = () => {
    this.dialogRef.close();
  }

}
