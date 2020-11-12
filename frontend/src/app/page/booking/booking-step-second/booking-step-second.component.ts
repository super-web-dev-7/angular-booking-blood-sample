import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-booking-step-second',
  templateUrl: './booking-step-second.component.html',
  styleUrls: ['./booking-step-second.component.scss']
})
export class BookingStepSecondComponent implements OnInit {

  @Input() zipcodeModel;
  @Input() bookingData;
  @Output() setBookingData = new EventEmitter();
  packages: any = [];
  selectedPackage = null;
  displayedPackage = null;
  additionalPackages: any = [];
  selectedAdditionalPackage = null;
  displayedAdditionalPackage = null;
  allTimes = [];
  selectedPTime = null;
  duration: any;
  packageNames = [
    'Männermedizin',
    'Gesundheits-Check-Up',
    'Corona',
    'Gutes Immunsystem',
    'Sexuelle Gesundheit',
    'Basis'
  ];
  secondForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    console.log(this.bookingData);
    this.selectedPackage = this.bookingData.package;
    this.selectedAdditionalPackage = this.bookingData.additionalPackage;
    this.displayedPackage = this.selectedPackage;
    this.displayedAdditionalPackage = this.selectedAdditionalPackage;
    this.secondForm = this.formBuilder.group({
      plz: new FormControl({ value: this.zipcodeModel.zipcode, disabled: true }),
      ort: new FormControl({ value: this.zipcodeModel.city, disabled: true })
    });
    this.httpService.get(URL_JSON.PACKAGE + '/getWithQuery?status=Public').subscribe((res: any) => {
      this.packages = res;
    });
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get?status=Public').subscribe((res: any) => {
      this.additionalPackages = res;
    });
    this.httpService.get(URL_JSON.BASE + 'booking_time/zipcodes/' + this.zipcodeModel.zipcode).subscribe((res: any) => {
      this.allTimes = res.response;
      this.duration = res.duration;
      if (this.bookingData.time) {
        this.selectedPTime = this.allTimes.findIndex(item => item === this.bookingData.time);
        console.log('>>>>>>>>>>', this.selectedPTime);
      }
    });
  }

  selectPackage = item => {
    if (!this.selectedPackage) {
      this.displayedPackage = item;
    }
  }

  setPackage = item => {
    if (this.selectedPackage === item) {
      this.selectedPackage = null;
    } else {
      this.selectedPackage = item;
    }
  }

  selectAdditionalPackage = item => {
    if (!this.selectedAdditionalPackage) {
      this.displayedAdditionalPackage = item;
    }
  }

  setAdditionalPackage = item => {
    if (this.selectedAdditionalPackage === item) {
      this.selectedAdditionalPackage = null;
    } else {
      this.selectedAdditionalPackage = item;
    }
  }

  submit = () => {
    const data = {
      package: this.selectedPackage,
      additionalPackage: this.selectedAdditionalPackage,
      time: this.allTimes[this.selectedPTime],
      duration: this.duration
    };
    this.setBookingData.emit(data);
  }

}
