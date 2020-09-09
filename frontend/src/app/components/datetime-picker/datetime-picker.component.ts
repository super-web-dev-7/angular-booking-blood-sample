import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DatetimePickerComponent implements OnInit {

  currentTime: any;
  interval = 3 * 60 * 60 * 1000;
  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    let i = 0;
    while (true) {
      this.currentTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), i * 3, 0, 0).getTime();
      if (this.currentTime > new Date().getTime()) {
        break;
      } else {
        i++;
      }
    }
  }

  getDate = time => {
    moment.locale('de');
    return moment(time).format('ddd DD.MM.YYYY hh:mm');
  }

}
