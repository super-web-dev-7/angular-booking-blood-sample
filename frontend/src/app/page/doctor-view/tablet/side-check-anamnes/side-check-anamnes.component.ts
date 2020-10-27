import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import * as moment from 'moment';

import {URL_JSON} from '../../../../utils/url_json';
import {SharedService} from '../../../../service/shared/shared.service';
import {HttpService} from '../../../../service/http/http.service';

@Component({
  selector: 'app-side-check-anamnes',
  templateUrl: './side-check-anamnes.component.html',
  styleUrls: ['./side-check-anamnes.component.scss']
})
export class SideCheckAnamnesComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() appointmentID;
  @Input() isMobile;
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  displayData: any;

  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.isSuccess = false;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.appointmentID).subscribe((res: any) => {
      this.displayData = res[0];
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
    this.closeSide.emit(false);
    this.sharedService.closeHistory.emit();
  }

  openSideHistory = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('contact');
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

  openRecall = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('call');
    } else {
      const emitData = {
        title: 't-recall',
        data: {
          appointmentId: this.displayData?.appointmentId,
          callbackId: this.displayData?.id,
          firstName: this.displayData?.patientFirstName,
          lastName: this.displayData?.patientLastName,
          phoneNumber: this.displayData?.phoneNumber,
          question: true
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }

  openMessage = () => {
    if (this.isMobile) {
      this.close();
    } else {
      const emitData = {
        title: 't-mail',
        data: {
          questionId: this.displayData?.id,
          appointmentId: this.displayData?.appointmentId,
          question: true
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }

  cancel = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/cancelAppointment/' + this.displayData?.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        console.log('res', res);
      }
    });
  }

  submit = () => {
    this.isSuccess = true;
  }

  archive = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/setAppointmentToArchive/' + this.displayData?.appointmentId, {}).subscribe(res => {
      const emitData = {
        table: 1,
        appointmentId: this.displayData?.appointmentId
      };
      this.sharedService.tabletArchive.emit(emitData);
      this.close();
    });
  }
}
