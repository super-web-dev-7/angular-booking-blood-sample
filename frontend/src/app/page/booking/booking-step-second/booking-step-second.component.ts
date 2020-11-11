import { Component, OnInit } from '@angular/core';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-booking-step-second',
  templateUrl: './booking-step-second.component.html',
  styleUrls: ['./booking-step-second.component.scss']
})
export class BookingStepSecondComponent implements OnInit {

  packages: any = [];
  selectedPackage = null;
  additionalPackages: any = [];
  selectedAdditionalPackage = null;
  allTimes = [1, 2, 3, 4, 5, 6];
  selectedPTime = null;
  packageNames = [
    'Männermedizin',
    'Gesundheits-Check-Up',
    'Corona',
    'Gutes Immunsystem',
    'Sexuelle Gesundheit',
    'Basis'
  ];
  constructor(
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.PACKAGE + '/getWithQuery?status=Public').subscribe((res: any) => {
      this.packages = res;
    });
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get?status=Public').subscribe((res: any) => {
      this.additionalPackages = res;
    });
  }

  selectPackage = id => {
    this.selectedPackage = id;
  }

  selectAdditionalPackage = id => {
    this.selectedAdditionalPackage = id;
  }

}
