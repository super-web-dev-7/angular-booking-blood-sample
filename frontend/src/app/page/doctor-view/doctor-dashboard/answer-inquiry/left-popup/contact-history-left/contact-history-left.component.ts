import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-contact-history-left',
  templateUrl: './contact-history-left.component.html',
  styleUrls: ['./contact-history-left.component.scss']
})
export class ContactHistoryLeftComponent implements OnInit {
  @Input() appointmentInfo;
  historyData: any;
  appointmentData: any;
  constructor(
    private sharedService: SharedService,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
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
    this.sharedService.closeHistory.emit('contact');
  }

}
