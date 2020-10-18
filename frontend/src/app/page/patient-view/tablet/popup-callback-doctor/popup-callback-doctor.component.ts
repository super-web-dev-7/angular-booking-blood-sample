import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-callback-doctor',
  templateUrl: './popup-callback-doctor.component.html',
  styleUrls: ['./popup-callback-doctor.component.scss']
})
export class PopupCallbackDoctorComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }
}
