import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-side-medical-history',
  templateUrl: './side-medical-history.component.html',
  styleUrls: ['./side-medical-history.component.scss']
})
export class SideMedicalHistoryComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() appointmentID;
  @Input() isMobile;
  @Input() isTablet;
  @Input() editingDoctorData;
  displayData: any;
  currentUser: any;
  isSideHistory = false;
  constructor(
    public sharedService: SharedService,
    public httpService: HttpService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
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

  close = () => {
    this.closeSide.emit(false);
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
    }
  }
}
