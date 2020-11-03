import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

import {URL_JSON} from '../../../../../../utils/url_json';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../../service/http/http.service';
import {AuthService} from '../../../../../../service/auth/auth.service';

@Component({
  selector: 'app-view-contact-history',
  templateUrl: './view-contact-history.component.html',
  styleUrls: ['./view-contact-history.component.scss']
})
export class ViewContactHistoryComponent implements OnInit {
  historyData: any;
  appointmentData: any;
  currentUser: any;
  expandedId = null;
  @Input() appointmentID;
  constructor(
    private sharedService: SharedService,
    public httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.DOCTOR + '/getContactHistory/' + this.appointmentID).subscribe((res: any) => {
      if (res) {
        this.appointmentData = res.appointment[0];
        this.historyData = res.contactHistory;
      }
    });
  }

  close = () => {
    this.sharedService.closeHistory.emit('v-contact');
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

}
