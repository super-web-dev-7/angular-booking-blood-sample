import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-popup-cancel-appointment',
  templateUrl: './popup-cancel-appointment.component.html',
  styleUrls: ['./popup-cancel-appointment.component.scss']
})
export class PopupCancelAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  cancelForm: FormGroup;
  showMessage: boolean;
  success = false;
  @Input() appointmentId;
  @Input() isMobile;
  @Input() isTablet;
  currentUser: any;
  displayData: any;
  constructor(
    public formBuilder: FormBuilder,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.showMessage = false;
    this.currentUser = this.authService.currentUserValue;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
    this.cancelForm = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  close = () => {
      this.closeSide.emit(false);
  }

  openMessage = () => {
    this.showMessage = !this.showMessage;
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  submit = () => {
    if (this.cancelForm.invalid) {
      return;
    }
    const data = {
      appointmentId: this.appointmentId,
      userId: this.currentUser.id,
      content: this.f.message.value
    };
    this.httpService.post(URL_JSON.PATIENT + '/cancel_appointment_by_patient', data).subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    });
    this.success = true;
  }

  get f(): any {
    return this.cancelForm.controls;
  }
}
