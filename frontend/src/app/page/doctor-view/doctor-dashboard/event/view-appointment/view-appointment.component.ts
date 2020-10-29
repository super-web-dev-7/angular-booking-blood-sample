import {Component, Inject, OnInit} from '@angular/core';
import {HttpService} from '../../../../../service/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {URL_JSON} from '../../../../../utils/url_json';
import * as moment from 'moment';
import {SharedService} from '../../../../../service/shared/shared.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {
  displayData: any;
  resultData: any;
  isContactHistory = false;
  isMedicalHistory = false;

  constructor(
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewAppointmentComponent>,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsDetailWithoutArchived/' + this.data.appointmentId)
      .subscribe((res: any) => {
      this.resultData = res[0];
    });
    this.sharedService.closeHistory.subscribe(res => {
      this.isMedicalHistory = false;
      this.isContactHistory = false;
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  openContactHistory = () => {
    this.isContactHistory = true;
    this.isMedicalHistory = false;
    const emitData = {
      title: 'contact',
      data: {
        appointmentId: this.displayData.id,
      }
    };
    this.sharedService.answer.emit(emitData);
  }

  openMedicalHistory = () => {
    this.isMedicalHistory = true;
    this.isContactHistory = false;
    const emitData = {
      title: 'medical',
      data: null
    };
    this.sharedService.answer.emit(emitData);
  }

  close = () => {
    this.dialogRef.close();
  }

}
