import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';
import {SocketService} from '../../../../service/socket/socket.service';
import {AuthService} from '../../../../service/auth/auth.service';

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
  currentUser: any;
  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
    public socketService: SocketService,
    public authService: AuthService,
  ) { }
  ngOnInit(): void {
    this.isSuccess = false;
    this.currentUser = this.authService.currentUserValue;
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
    this.socketService.editCallbackTable({
      doctorId: this.currentUser.id,
      appointmentId: this.displayData.appointmentId,
      doctorFirstName: this.currentUser.firstName,
      doctorLastName: this.currentUser.lastName,
      type: 0,
      table: 2
    });
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
          firstName: this.displayData.patientFirstName,
          lastName: this.displayData.patientLastName,
          phoneNumber: this.displayData.phoneNumber,
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
          questionId: this.displayData.id,
          appointmentId: this.displayData.appointmentId,
          question: true
        }
      };
      this.sharedService.tabletLeftSide.emit(emitData);
      this.isSideHistory = false;
    }
  }


  cancel = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/cancelAppointment/' + this.displayData.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        console.log('res', res);
      }
    });
  }

  submit = () => {
    this.isSuccess = true;
  }

  archive = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/setAppointmentToArchive/' + this.displayData.appointmentId, {}).subscribe(res => {
      console.log(res);
    });
  }
}
