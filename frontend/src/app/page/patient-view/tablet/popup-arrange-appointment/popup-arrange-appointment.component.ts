import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';

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
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      plz: [this.addressData?.plz, Validators.required],
      ort: [this.addressData?.ort, Validators.required]
    });
    this.httpService.get(URL_JSON.PACKAGE + '/getWithQuery?status=Public').subscribe((res: any) => {
      this.packageData = res;
      console.log('package', res);
    });
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get?status=Public').subscribe((res: any) => {
      this.packages = res;
    });
  }

  get f(): any {
    return this.appointmentForm.controls;
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
