import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class CancelAppointmentComponent implements OnInit {
  showMessage: boolean;
  constructor() { }

  ngOnInit(): void {
    this.showMessage = false;
  }

  openMessage = () => {
    this.showMessage = !this.showMessage;
  }

}
