import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';

import {SharedService} from '../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../utils/url_json';

@Component({
  selector: 'app-anamnes-check',
  templateUrl: './anamnes-check.component.html',
  styleUrls: ['./anamnes-check.component.scss']
})
export class AnamnesCheckComponent implements OnInit {
  isCheckContact = false;
  customText = '';
  content = null;
  Editor = ClassicEditor;
  displayData: any;

  constructor(
    private sharedService: SharedService,
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res[0];
    });
    this.sharedService.closeHistory.subscribe(res => {
      this.isCheckContact = false;
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  openCheckContact = () => {
    this.isCheckContact = true;
    this.sharedService.check.emit('v-contact');
  }

  openCallPatient = () => {
    this.isCheckContact = false;
    this.sharedService.check.emit('call-patient');
  }

}
