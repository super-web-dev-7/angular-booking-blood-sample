import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-side-patient-inquiry',
  templateUrl: './side-patient-inquiry.component.html',
  styleUrls: ['./side-patient-inquiry.component.scss']
})
export class SidePatientInquiryComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() appointmentId;
  @Input() isMobile;
  @Input() isTablet;
  displayData: any;
  currentUser: any;
  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithCallbackById/' + this.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
    this.currentUser = this.authService.currentUserValue;
  }

  close = () => {
    this.closeSide.emit(false);
  }

  formatTime = (time) => {
    return moment(time).format('DD.MM.YYYY HH:mm');
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

}
