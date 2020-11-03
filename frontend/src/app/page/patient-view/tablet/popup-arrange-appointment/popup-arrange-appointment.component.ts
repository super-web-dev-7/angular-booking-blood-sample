import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';
import {AuthService} from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-popup-arrange-appointment',
  templateUrl: './popup-arrange-appointment.component.html',
  styleUrls: ['./popup-arrange-appointment.component.scss']
})
export class PopupArrangeAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  @Input() addressData;
  packages = [];
  packageData = [];
  selectedPackage = null;
  selectedBoard = null;
  appointmentForm: FormGroup;
  allTimes = [];
  selectedPTime = null;
  isShow = false;
  currentUser: any;
  userInfo: any;
  paymentOptions = [
    {label: 'Heidelpay', value: 'alternative'},
    {label: 'Invoice', value: 'customerStore'}
  ];
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      plz: [this.addressData?.plz, Validators.required],
      ort: [this.addressData?.ort, Validators.required],
      payment: [null, Validators.required],
      message: [null, Validators.required]
    });
    this.httpService.get(URL_JSON.PACKAGE + '/getWithQuery?status=Public').subscribe((res: any) => {
      this.packageData = res;
    });
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get?status=Public').subscribe((res: any) => {
      this.packages = res;
    });
    this.getUserInfo(this.currentUser.id);
  }

  get f(): any {
    return this.appointmentForm.controls;
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

  getBookingTime = (id) => {
    this.httpService.get(URL_JSON.BASE + '/booking_time/package/' + id).subscribe((res: any) => {
      this.allTimes = res;
    });
  }

  moreItems = () => {
    this.isShow = !this.isShow;
  }

  close = () => {
    this.closeSide.emit(false);
  }

  selectPackage = (id) => {
    this.selectedPackage = id;
  }

  selectBoard = (id) => {
    this.selectedBoard = id;
    this.getBookingTime(id);
  }

}
