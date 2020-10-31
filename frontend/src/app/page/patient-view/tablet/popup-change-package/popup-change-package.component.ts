import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-popup-change-package',
  templateUrl: './popup-change-package.component.html',
  styleUrls: ['./popup-change-package.component.scss']
})
export class PopupChangePackageComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  @Input() appointmentId;
  isShow = false;
  packages = [];
  selectedPackage = null;
  isValid = false;
  displayData: any;
  packageData = [];
  currentUser: any;
  selectedBoard = null;
  allTimes = [];
  selectedPTime = null;
  userInfo: any;
  changePackageForm: FormGroup;
  paymentOptions = [
    {label: 'Heidelpay', value: 'alternative'},
    {label: 'Invoice', value: 'customerStore'}
  ];
  constructor(
    public httpService: HttpService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.isShow = false;
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.appointmentId).subscribe((res: any) => {
      this.displayData = res;
      if (this.displayData) {
        this.getBookingTime(this.displayData.packageId);
      }
    });
    this.httpService.get(URL_JSON.PACKAGE + '/getWithQuery?status=Public').subscribe((res: any) => {
      this.packageData = res;
    });
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get?status=Public').subscribe((res: any) => {
      this.packages = res;
    });
    this.getUserInfo(this.currentUser.id);
    this.changePackageForm = this.formBuilder.group({
      payment: [this.paymentOptions[0].value, Validators.required]
    });
  }

  get f(): any {
    return this.changePackageForm.controls;
  }

  close = () => {
    this.closeSide.emit(false);
  }

  moreItems = () => {
    this.isShow = !this.isShow;
  }

  getBookingTime = (id) => {
    this.httpService.get(URL_JSON.BASE + '/booking_time/package/' + id).subscribe((res: any) => {
      this.allTimes = res;
    });
  }

  getUserInfo = (id) => {
    this.httpService.get(URL_JSON.USER + '/getPatientById/' + id).subscribe((res: any) => {
      this.userInfo = res;
      if (this.userInfo?.alternative) {
        this.f.payment.setValue('alternative');
      } else if (this.userInfo?.customerStore) {
        this.f.payment.setValue('customerStore');
      } else {
        this.f.payment.setValue('alternative');
      }
    });
  }
  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  selectPackage = (id) => {
    this.selectedPackage = id;
  }

  selectBoard = (id) => {
    this.selectedBoard = id;
    this.getBookingTime(id);
  }
}
