import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';

import {AuthService} from '../../../service/auth/auth.service';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {SessionExpireAlertComponent} from '../../../components/session-expire-alert/session-expire-alert.component';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.scss']
})
export class NurseDashboardComponent implements OnInit, OnDestroy {

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
  workingHourArray = [];

  defaultEmail = 'muster@mustermann.de';
  customEmail = '';
  isEditEmail = false;

  defaultNumber = '';
  customNumber = '';
  isEditNumber = false;

  isEditText = false;
  defaultText = '';
  customText = 'Sehr geehrte Frau Skywalker, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Mit freundlichen Grüßen Schwester 1';

  isSubmit = false;
  allAppointments;
  appointments = [];
  currentTime;
  currentDay;
  now;
  Arr = Array;
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  textTemplate = [];
  selectedAppointment: any;
  Editor = ClassicEditor;
  allKeywords = [];

  appointmentForm: FormGroup;
  showAlert = false;
  subsVar: any;
  isLoading: boolean;

  constructor(
    public authService: AuthService,
    public httpService: HttpService,
    public breakpointObserver: BreakpointObserver,
    public router: Router,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
    let dialog;
    this.subsVar = this.authService.showExpireAlertSubject.subscribe(value => {
      if (value) {
        dialog = this.dialog.open(SessionExpireAlertComponent, {disableClose: true});
      }
    });

    this.initForm();
    this.now = new Date();
    this.currentTime = this.now.getTime();
    this.currentDay = this.now.getTime();
    setInterval(() => {
      this.now = new Date();
      this.currentTime = this.now.getTime();
    }, 1000);
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentByNurse/' + this.currentUser.id).subscribe((res: any) => {
      this.allAppointments = res;
      this.workingStartHour = res[0]?.workingTimeFrom;
      this.workingEndHour = res[0]?.workingTimeUntil;
      this.getCurrentDayAppointment();
      this.workingHourArray = new Array(Math.ceil((this.workingEndHour - this.workingStartHour) / 2));
    });
    this.httpService.get(URL_JSON.TEMPLATE + '/getWithQuery?receiver=1').subscribe((res: any) => {
      this.textTemplate = res;
    });

    this.httpService.get(URL_JSON.TEMPLATE + '/getAllKeywords').subscribe((res: any) => {
      this.allKeywords = res;
    });
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
  }

  getCurrentDayAppointment = () => {
    const currentDay = new Date(this.currentDay);
    const currentDayStart = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), 0, 0);
    this.appointments = [];
    for (const appointment of this.allAppointments) {
      if (appointment.startTime > currentDayStart.getTime() && appointment.startTime < currentDayStart.getTime() + 86400 * 1000) {
        this.appointments.push(appointment);
      }
    }
  }

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 599px)');
  }

  initForm = () => {
    this.appointmentForm = this.formBuilder.group({
      pressure: [null, Validators.required],
      pulse: [null, Validators.required],
      oxygen: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
    });
  }

  getCurrentTimeFormat = () => {
    return moment(this.currentTime).format('LT');
  }

  getStartTime = (time) => {
    return moment(time).format('HH:mm');
  }

  getEndTime = (time, duration) => {
    return moment(time + duration * 60 * 1000).format('HH:mm');
  }

  getTimeString = (time, format) => {
    return moment(time).format(format);
  }

  getDate = (time, parameter) => {
    let date;
    if (time) {
      date = new Date(time);
    } else {
      date = new Date();
    }
    if (parameter === 'date') {
      return date.getDate();
    } else if (parameter === 'month') {
      return date.getMonth();
    } else if (parameter === 'hour') {
      return date.getHours();
    } else if (parameter === 'minute') {
      return date.getMinutes();
    }
  }

  getFloor = (value) => {
    const floor = Math.floor(value);
    return floor < 10 ? '0' + floor : floor.toString();
  }

  prevDay = () => {
    this.currentDay -= 86400 * 1000;
    this.getCurrentDayAppointment();
  }

  nextDay = () => {
    this.currentDay += 86400 * 1000;
    this.getCurrentDayAppointment();
  }

  selectDay = (index) => {
    this.currentDay += (index - 2) * 86400 * 1000;
    this.getCurrentDayAppointment();
  }

  setCalendarRange = index => {
    if (index === 0) {
      console.log('5day');
    } else {
      console.log('month');
    }
  }

  openRightMenu = (index) => {
    this.isRightMenuOpen = true;
    console.log(this.selectedAppointment);
    this.defaultEmail = this.selectedAppointment.patientEmail;
    this.defaultNumber = this.selectedAppointment.patientNumber;
    if (index === 0) {
      this.isPatientPreparedMenuOpen = true;
      this.customText = this.getTemplate('Patient Prepared');
    } else if (index === 1) {
      this.isAppointmentDelayMenuOpen = true;
      this.customText = this.getTemplate('Appointment Delay');
    } else if (index === 2) {
      this.isShiftScheduleMenuOpen = true;
      this.customText = this.getTemplate('Appointment Shift');
    } else if (index === 3) {
      this.isAppointmentTakenMenuOpen = true;
      this.customText = this.getTemplate('Appointment Taken');
    } else if (index === 4) {
      this.isPatientNotThereMenuOpen = true;
      this.customText = this.getTemplate('Patient Not There');
    }
  }

  getTemplate = (assign) => {
    const index = this.textTemplate.findIndex(item => item.assign === assign);
    if (index > -1) {
      let template = this.textTemplate[index].message;
      for (const keyword of this.allKeywords) {
        template = template.replace('{' + keyword.keyword + '}', keyword.value);
      }
      return template;
    } else {
      return '';
    }
  }

  close = () => {
    this.isRightMenuOpen = false;
    this.isProfileMenuOpen = false;
    this.isAppointmentTakenMenuOpen = false;
    this.isAppointmentDelayMenuOpen = false;
    this.isPatientPreparedMenuOpen = false;
    this.isPatientNotThereMenuOpen = false;
    this.isShiftScheduleMenuOpen = false;
    this.isSubmit = false;
    this.isEditText = false;
    this.isEditEmail = false;
  }

  logout = () => {
    this.authService.logout();
  }

  patientPrepared = () => {
    const data = {
      ready: true
    };
    this.httpService.update(URL_JSON.APPOINTMENT + '/ready/' + this.selectedAppointment.id, data).subscribe((res: any) => {
      const index = this.allAppointments.findIndex(item => item.id === this.selectedAppointment.id);
      this.allAppointments[index].ready = res.ready;
      this.close();
    });
  }

  appointmentDelay = () => {
    // const emailData = {
    //   email: this.customEmail ? this.customEmail : this.defaultEmail,
    //   content: this.customText,
    //   subject: 'Appointment Delay'
    // };
    this.isLoading = true;

    const smsData = {
      subject: 'Appointment Delay',
      receiver: this.selectedAppointment.patientId,
      phoneNumber: this.customNumber ? this.customNumber : this.defaultNumber,
      content: this.customText
    };
    this.httpService.post(URL_JSON.BASE + '/nurse/appointment_delay', {emailData: null, smsData})
      .subscribe((res: any) => {
      console.log(res);
      this.isLoading = false;
      if (res.smsResult) {
        this.close();
      } else {
        console.log('sms failed');
      }
    });
  }

  shiftSchedule = () => {
    this.isLoading = true;
    const emailData = {
      email: this.customEmail ? this.customEmail : this.defaultEmail,
      content: this.customText,
      subject: 'Appointment Moving'
    };
    const smsData = {
      subject: 'Appointment Moving',
      receiver: this.selectedAppointment.patientId,
      phoneNumber: this.customNumber ? this.customNumber : this.defaultNumber,
      content: this.customText
    };
    this.httpService.post(URL_JSON.BASE + '/nurse/appointment_delay', {emailData, smsData})
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log(res);
        this.close();
      });
  }

  get af(): any {
    return this.appointmentForm.controls;
  }

  appointmentTaken = () => {
    this.isLoading = true;
    if (!this.appointmentForm.invalid) {
      const emailData = {
        email: this.customEmail ? this.customEmail : this.defaultEmail,
        content: this.customText,
        subject: 'Appointment Done'
      };
      const data = {
        appointmentId: this.selectedAppointment.id,
        nurseId: this.currentUser.id,
        pressure: this.af.pressure.value,
        pulse: this.af.pulse.value,
        oxygen: this.af.oxygen.value,
        height: this.af.height.value,
        weight: this.af.weight.value,
        content: this.customText
      };
      this.httpService.post(URL_JSON.BASE + '/nurse/appointment_taken', {emailData, data}).subscribe(res => {
        // this.close();
        this.isSubmit = true;
        this.isLoading = false;
      });
    }
  }

  patientNotThere = () => {
    this.isLoading = true;
    const emailData = {
      email: this.customEmail ? this.customEmail : this.defaultEmail,
      content: this.customText,
      subject: 'Patient Not There'
    };
    const smsData = {
      subject: 'Patient Not There',
      receiver: this.selectedAppointment.patientId,
      phoneNumber: this.customNumber ? this.customNumber : this.defaultNumber,
      content: this.customText
    };
    this.httpService.post(URL_JSON.BASE + '/nurse/appointment_not_there', {emailData, smsData}).subscribe(res => {
      // this.close();
      this.isSubmit = true;
      this.isLoading = false;
    });
  }
}
