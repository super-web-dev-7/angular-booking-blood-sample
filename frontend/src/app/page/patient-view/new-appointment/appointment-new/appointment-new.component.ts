import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {URL_JSON} from '../../../../utils/url_json';
import {AuthService} from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.scss']
})
export class AppointmentNewComponent implements OnInit {
  packages = [];
  displayData = [];
  selectedPackage = null;
  selectedBoard = null;
  appointmentForm: FormGroup;
  allTimes = [];
  selectedPTime = 0;
  currentUser: any;
  userInfo: any;
  paymentOptions = [
    {label: 'Heidelpay', value: 'alternative'},
    {label: 'Invoice', value: 'customerStore'}
  ];
  constructor(
    private dialogRef: MatDialogRef<AppointmentNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      plz: [this.data?.plz, Validators.required],
      ort: [this.data?.city, Validators.required],
      payment: [null, Validators.required],
      message: [null]
    });
    this.httpService.get(URL_JSON.PACKAGE + '/getWithQuery?status=Public').subscribe((res: any) => {
      this.displayData = res;
    });
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get?status=Public').subscribe((res: any) => {
      this.packages = res;
    });
    this.getUserInfo(this.currentUser.id);
    this.httpService.get(URL_JSON.BASE + 'booking_time/zipcode/' + this.data.plz).subscribe((res: any) => {
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

  get f(): any {
    return this.appointmentForm.controls;
  }

  close = () => {
    this.dialogRef.close();
  }

  selectPackage = (id) => {
    this.selectedPackage = id;
  }

  selectBoard = (id) => {
    this.selectedBoard = id;
  }

  submit = () => {
    if (this.appointmentForm.invalid) {
      return;
    }
    if (!this.selectedPackage || !this.selectedBoard) {
      return;
    }
    const data = {
      packageId: this.selectedBoard,
      additionalPackageId: this.selectedPackage,
      time: this.allTimes[this.selectedPTime],
      plz: this.f.plz.value,
      ort: this.f.ort.value,
      payment: this.f.payment.value,
      message: this.f.message.value,
      userId: this.currentUser.id
    };
    this.httpService.post(URL_JSON.APPOINTMENT + '/create_by_patient', data).subscribe((res: any) => {
      if (res) {
        if (res.message === 'success') {
          this.dialogRef.close(true);
        }
      }
      console.log(res);
    });
  }
}
