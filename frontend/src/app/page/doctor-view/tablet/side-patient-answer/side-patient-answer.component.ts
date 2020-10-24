import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-side-patient-answer',
  templateUrl: './side-patient-answer.component.html',
  styleUrls: ['./side-patient-answer.component.scss']
})
export class SidePatientAnswerComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() callbackID;
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  isMobile = false;
  isTablet = false;
  displayData: any;
  messageSent = false;
  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.isSuccess = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.sharedService.closeHistory.subscribe(res => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithCallbackById/' + this.callbackID).subscribe((res: any) => {
      this.displayData = res;
    });
    this.sharedService.sentMessage.subscribe(res => {
      if (res) {
        this.messageSent = true;
      }
    });
  }

  close = () => {
    this.closeSide.emit(false);
    this.sharedService.closeHistory.emit();
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

  openSideHistory = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('contact');
    } else {
      const emitData = {
        title: 't-history',
        data: {
          appointmentId: this.displayData.appointmentId,
          callbackId: this.displayData.id,
          patientFirstName: this.displayData.patientFirstName,
          patientLastName: this.displayData.patientLastName,
          phoneNumber: this.displayData.phoneNumber
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
          callbackId: this.displayData.id,
          patientFirstName: this.displayData.patientFirstName,
          patientLastName: this.displayData.patientLastName,
          phoneNumber: this.displayData.phoneNumber
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isAnamnes = true;
      this.isSideHistory = false;
    }
  }

  openRecall = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('call');
    } else {
      const emitData = {
        title: 't-recall',
        data: {
          appointmentId: this.displayData.appointmentId,
          callbackId: this.displayData.id,
          patientFirstName: this.displayData.patientFirstName,
          patientLastName: this.displayData.patientLastName,
          phoneNumber: this.displayData.phoneNumber
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }

  openMessage = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.tabletLeftSide.emit('t-mail');
    } else {
      const emitData = {
        title: 't-mail',
        data: {
          appointmentId: this.displayData.appointmentId,
          callbackId: this.displayData.id,
          firstName: this.displayData.patientFirstName,
          lastName: this.displayData.patientLastName,
          phoneNumber: this.displayData.phoneNumber
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }

  submit = () => {
    if (!this.messageSent) {
      return;
    }
    this.httpService.update(URL_JSON.DOCTOR + '/inquiryAnswered/' + this.displayData.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        this.isSuccess = true;
      }
    });
  }
  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

}
