import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';
import {AuthService} from '../../../../service/auth/auth.service';
import {SharedService} from '../../../../service/shared/shared.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {
  currentUser;
  displayData: any;
  isContactHistory = false;
  isMedicalHistory = false;
  constructor(
    private dialogRef: MatDialogRef<SearchModalComponent>,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithCallbackById/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
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

  formatTime = (time) => {
    return moment(time).format('DD.MM.YYYY HH:mm');
  }

  close = () => {
    this.dialogRef.close();
  }

  openMedicalHistory = () => {
    this.isMedicalHistory = true;
    this.isContactHistory = false;
    const emitData = {
      title: 'medical',
      data: this.data
    };
    this.sharedService.answer.emit(emitData);
  }

  openContactHistory = () => {
    this.isContactHistory = true;
    this.isMedicalHistory = false;
    const emitData = {
      title: 'contact',
      data: {
        appointmentId: this.displayData.appointmentId,
        callbackId: this.displayData.id
      }
    };
    this.sharedService.answer.emit(emitData);
  }

}
