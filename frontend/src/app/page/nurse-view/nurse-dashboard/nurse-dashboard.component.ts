import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.scss']
})
export class NurseDashboardComponent implements OnInit {

  isOpen = false;
  isRightMenuOpen = false;
  isProfileMenuOpen = false;
  isPatientPreparedMenuOpen = false;
  isAppointmentDelayMenuOpen = false;
  isShiftScheduleMenuOpen = false;
  isAppointmentTakenMenuOpen = false;
  isPatientNotThereMenuOpen = false;
  isMobile = false;
  currentUser: any;
  workingStartHour = 18;
  workingEndHour = 32;
  workingHourArray = new Array((32 - 18) / 2);
  constructor(
    public authService: AuthService,
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
  }

  getFloor = (value) => {
    const floor = Math.floor(value);
    return floor < 10 ? '0' + floor : floor.toString();
  }

  close = () => {
    this.isProfileMenuOpen = false;
    this.isAppointmentTakenMenuOpen = false;
    this.isAppointmentDelayMenuOpen = false;
    this.isPatientPreparedMenuOpen = false;
    this.isPatientPreparedMenuOpen = false;
    this.isShiftScheduleMenuOpen = false;
  }
}

const DummyData = [
  {
    type: 'Termin wahrgenommen',
    patientName: 'Patientenname',
    packet: 'Packet Number 1',
    start: 18,
  }
];
