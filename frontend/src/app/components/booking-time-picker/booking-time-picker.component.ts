import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-time-picker',
  templateUrl: './booking-time-picker.component.html',
  styleUrls: ['./booking-time-picker.component.scss']
})
export class BookingTimePickerComponent implements OnInit {
  @Input() data;
  @Output() setSelectedTime = new EventEmitter();
  index = 1;
  constructor() { }

  ngOnInit(): void {
    this.setSelectedTime.emit(this.index);
  }

  getDate = time => {
    if (time) {
      moment.locale('de');
      return moment(time).format('ddd DD.MM.YYYY HH:mm');
    } else {
      return null;
    }
  }

  up = () => {
    if (this.index === 0) {
      this.setSelectedTime.emit(this.index);
      return;
    }
    this.index--;
    this.setSelectedTime.emit(this.index);
  }

  down = () => {
    if (this.index === this.data.length - 1) {
      this.setSelectedTime.emit(this.index);
      return;
    }
    this.index++;
    this.setSelectedTime.emit(this.index);
  }

}
