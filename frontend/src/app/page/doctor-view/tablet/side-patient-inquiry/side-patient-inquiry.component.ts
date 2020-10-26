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
  isAnamnes = false;
  isSideHistory = false;
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
    this.sharedService.closeHistory.subscribe(res => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
  }

  close = () => {
    this.closeSide.emit(false);
    this.sharedService.closeHistory.emit();
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

  openSideHistory = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('contact');
    } else {
      const emitData = {
        title: 't-history',
        data: {
          appointmentId: this.displayData.appointmentId,
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = true;
      this.isAnamnes = false;
    }
  }

  openAnamneses = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('medical');
    } else {
      const emitData = {
        title: 't-anamnes',
        data: {
          appointmentId: this.displayData.appointmentId,
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isAnamnes = true;
      this.isSideHistory = false;
    }
  }

}
