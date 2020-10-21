import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-callback-doctor',
  templateUrl: './popup-callback-doctor.component.html',
  styleUrls: ['./popup-callback-doctor.component.scss']
})
export class PopupCallbackDoctorComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  selectedDay: any;
  times = [
    {time: 'morning', label: 'Vormittags (09:00 - 12:00)'},
    {time: 'noon', label: 'Nachmittags (12:00 - 16:00)'},
    {time: 'evening', label: 'Abends (16:00 - 19:00)'}
  ];
  selectedTime = null;
  isValid = false;
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

  selectDay = (event) => {
    this.selectedDay = event;
  }
}
