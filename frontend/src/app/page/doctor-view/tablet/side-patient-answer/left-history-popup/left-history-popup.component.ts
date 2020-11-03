import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

import {URL_JSON} from '../../../../../utils/url_json';
import {SharedService} from '../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../service/http/http.service';
import {AuthService} from '../../../../../service/auth/auth.service';

@Component({
  selector: 'app-left-history-popup',
  templateUrl: './left-history-popup.component.html',
  styleUrls: ['./left-history-popup.component.scss']
})
export class LeftHistoryPopupComponent implements OnInit {
  historyData: any;
  appointmentData: any;
  currentUser: any;
  expandedId = null;
  @Input() appointmentInfo;
  constructor(
    public sharedService: SharedService,
    public httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.DOCTOR + '/getContactHistory/' + this.appointmentInfo.appointmentId).subscribe((res: any) => {
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
    this.sharedService.closeHistory.emit('t-history');
  }

}
