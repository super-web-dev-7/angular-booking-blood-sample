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

  defaultEmail = 'muster@mustermann.de';
  customEmail = '';
  isEditEmail = false;

  isEditText = false;
  defaultText = '';
  customText = 'Sehr geehrte Frau Skywalker, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Mit freundlichen Grüßen Schwester 1';
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
    this.isRightMenuOpen = false;
    this.isProfileMenuOpen = false;
    this.isAppointmentTakenMenuOpen = false;
    this.isAppointmentDelayMenuOpen = false;
    this.isPatientPreparedMenuOpen = false;
    this.isPatientPreparedMenuOpen = false;
    this.isShiftScheduleMenuOpen = false;
  }

  patientPrepared = () => {
    this.close();
  }

  appointmentDelay = () => {
    this.close();
  }

  shiftSchedule = () => {
    this.close();
  }

  appointmentTaken = () => {
    this.close();
  }

  patientNotThere = () => {
    this.close();
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
