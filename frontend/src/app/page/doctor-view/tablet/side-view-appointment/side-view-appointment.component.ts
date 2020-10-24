import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../../service/http/http.service';
import {SharedService} from '../../../../service/shared/shared.service';
import * as moment from 'moment';
import {URL_JSON} from '../../../../utils/url_json';

@Component({
  selector: 'app-side-view-appointment',
  templateUrl: './side-view-appointment.component.html',
  styleUrls: ['./side-view-appointment.component.scss']
})
export class SideViewAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() appointmentID;
  displayData: any;
  isAnamnes = false;
  isSideHistory = false;
  constructor(
    public httpService: HttpService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService.closeHistory.subscribe(res => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.appointmentID).subscribe((res: any) => {
      this.displayData = res;
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

  openMedicalHistory = () => {
    this.isAnamnes = true;
    this.isSideHistory = false;
    const emitData = {
      title: 't-anamnes',
      data: {
        appointmentId: this.displayData.appointmentId,
      }
    };
    this.sharedService.tabletLeftSide.emit(emitData);
  }

  openContactHistory = () => {
    this.isAnamnes = false;
    this.isSideHistory = true;
    const emitData = {
      title: 't-history',
      data: {
        appointmentId: this.displayData.id,
      }
    };
    this.sharedService.tabletLeftSide.emit(emitData);
  }
}
