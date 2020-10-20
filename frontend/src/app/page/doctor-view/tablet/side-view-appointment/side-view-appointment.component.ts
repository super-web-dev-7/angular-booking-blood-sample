import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-view-appointment',
  templateUrl: './side-view-appointment.component.html',
  styleUrls: ['./side-view-appointment.component.scss']
})
export class SideViewAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }
}
