import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import * as moment from 'moment';

import {URL_JSON} from '../../../../utils/url_json';
import {SharedService} from '../../../../service/shared/shared.service';
import {HttpService} from '../../../../service/http/http.service';
import {SocketService} from '../../../../service/socket/socket.service';

@Component({
  selector: 'app-side-patient-answer',
  templateUrl: './side-patient-answer.component.html',
  styleUrls: ['./side-patient-answer.component.scss']
})
export class SidePatientAnswerComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() appointmentId;
  @Input() isMobile;
  @Input() isTablet;
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  displayData: any;
  allData: any;
  selectedMessage = null;

  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
    public socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.isSuccess = false;
    this.sharedService.closeHistory.subscribe(() => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithCallbackById/' + this.appointmentId).subscribe((res: any) => {
      if (res.length > 0) {
        this.displayData = res[0];
      }
      this.allData = res;
    });
  }

  close = () => {
    this.closeSide.emit(false);
    this.sharedService.closeHistory.emit();
    this.socketService.closeEmit();
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

  selectMessage = item => {
    if (!item.answeredCallbackId) {
      this.selectedMessage = item.id;
    }
  }

  openSideHistory = () => {
    if (this.isMobile) {
      const emitData = {
        title: 'contact',
        data: {
          appointmentId: this.displayData?.appointmentId,
        }
      };
      this.sharedService.answer.emit(emitData);
    } else {
      const emitData = {
        title: 't-history',
        data: {
          appointmentId: this.displayData?.appointmentId,
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = true;
      this.isAnamnes = false;
    }
  }

  openAnamneses = () => {
    if (this.isMobile) {
      const emitData = {
        title: 'medical',
        data: {
          appointmentId: this.displayData?.appointmentId,
        }
      };
      this.sharedService.answer.emit(emitData);
    } else {
      const emitData = {
        title: 't-anamnes',
        data: {
          appointmentId: this.displayData?.appointmentId,
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isAnamnes = true;
      this.isSideHistory = false;
    }
  }

  openRecall = () => {
    if (this.isMobile) {
      const emitData = {
        title: 'call',
        data: {
          appointmentId: this.displayData?.appointmentId,
          callbackId: this.displayData?.id,
          firstName: this.displayData?.patientFirstName,
          lastName: this.displayData?.patientLastName,
          phoneNumber: this.displayData?.phoneNumber,
          question: false
        }
      };
      this.sharedService.answer.emit(emitData);
    } else {
      const emitData = {
        title: 't-recall',
        data: {
          appointmentId: this.displayData?.appointmentId,
          callbackId: this.displayData?.id,
          firstName: this.displayData?.patientFirstName,
          lastName: this.displayData?.patientLastName,
          phoneNumber: this.displayData?.phoneNumber,
          question: false
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }

  openMessage = () => {
    if (!this.selectedMessage) {
      return;
    }
    if (this.isMobile) {
      const emitData = {
        title: 't-mail',
        data: {
          appointmentId: this.displayData?.appointmentId,
          callbackId: this.selectedMessage,
          question: false
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
    } else {
      const emitData = {
        title: 't-mail',
        data: {
          appointmentId: this.displayData?.appointmentId,
          callbackId: this.selectedMessage,
          question: false
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }

  submit = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/inquiryAnswered/' + this.displayData.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        this.isSuccess = true;
      }
    });
  }

  archive = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/setAppointmentToArchive/' + this.displayData.appointmentId, {}).subscribe(() => {
      const emitData = {
        table: 0,
        appointmentId: this.displayData?.appointmentId
      };
      this.sharedService.tabletArchive.emit(emitData);
      this.close();
    });
  }

}
