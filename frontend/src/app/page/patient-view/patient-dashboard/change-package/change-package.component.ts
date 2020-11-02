import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-package',
  templateUrl: './change-package.component.html',
  styleUrls: ['./change-package.component.scss']
})
export class ChangePackageComponent implements OnInit {
  packages = [];
  selectedPackage = null;
  isValid = false;
  displayData: any;
  packageData: any;
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
    private dialogRef: MatDialogRef<ChangePackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentDetail/' + this.data.appointmentId).subscribe((res: any) => {
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
      payment: [this.paymentOptions[0].value, Validators.required],
      message: [null, Validators.required]
    });
  }

  get f(): any {
    return this.changePackageForm.controls;
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

  close = () => {
    this.dialogRef.close(false);
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
