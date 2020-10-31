import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-popup-call-sister',
  templateUrl: './popup-call-sister.component.html',
  styleUrls: ['./popup-call-sister.component.scss']
})
export class PopupCallSisterComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  @Input() appointmentId;
  displayData: any;
  currentUser: any;
  nurseInfo: any;
  constructor(
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithNurseInfo/' + this.appointmentId).subscribe((res: any) => {
      this.nurseInfo = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.appointmentId).subscribe((res: any) => {
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
    this.closeSide.emit(false);
  }
}
