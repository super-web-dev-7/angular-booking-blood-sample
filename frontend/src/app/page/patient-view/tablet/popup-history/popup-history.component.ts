import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

import {URL_JSON} from '../../../../utils/url_json';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-popup-history',
  templateUrl: './popup-history.component.html',
  styleUrls: ['./popup-history.component.scss']
})
export class PopupHistoryComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  @Input() appointmentId;
  historyData: any;
  appointmentData: any;
  currentUser: any;
  expandedId = null;
  constructor(
    public httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.DOCTOR + '/getContactHistory/' + this.appointmentId).subscribe((res: any) => {
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
    this.closeSide.emit(false);
  }

}
