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
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }
}
