import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {curveCardinal} from 'd3-shape';
import * as moment from 'moment';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  label = [
    'Bestätigte Termine', 'Offene Termine', 'Storniert / verschoben', 'Abgeschlossene Termine'
  ];
  labelClass = ['light-green-color', 'pink-color', 'red-color', 'green-color'];

  packageLabel = [];
  packageLabelClass = ['light-green-color', 'pink-color', 'red-color', 'green-color', 'blue-color', 'yellow-color'];

  data = [];
  packageData = [];
  colorArray = ['#50E3C2', '#F389CC', '#E87C60', '#89DF8C', '#4A90E2', '#F5A623'];

  packageTotal = 0;
  showDetailPeriod = false;

  barChartData = [];

  monthArray = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ];

  lineChartData = [
    {
      name: 'Patient',
      series: []
    },
  ];

  curve: any = curveCardinal;
  customColors = {
    domain: ['#FFF', '#FFF'],
  };
  monthlyData: any;
  dataPerPatient: any;
  averageData: any;

  fromDate: any = '';
  toDate: any = '';

  allAgency = [];
  selectedAgency = 0;

  currentUser: any;
  constructor(
    public httpService: HttpService,
    public authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'custom-calendar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/calendar.svg')
    );
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.analysisByAgency();
    this.httpService.get(URL_JSON.AGENCY + '/get').subscribe((res: any) => {
      this.allAgency = res;
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/analysisByPackage/' + this.currentUser.id).subscribe((res: any) => {
      for (const [index, item] of res.entries()) {
        this.packageData.push({
          color: this.colorArray[index % this.colorArray.length],
          value: item.count_by_package,
          icon: 'heart'
        });
        this.packageLabel.push(item.packageName);
      }
      for (const item of this.packageData) {
        this.packageTotal += item.value;
      }
      if (this.packageTotal === 0) {
        this.packageTotal = 1;
      }
    });

    this.httpService.get(URL_JSON.APPOINTMENT + '/analysisPerMonth/' + this.currentUser.id).subscribe((res: any) => {
      for (const item of res) {
        this.barChartData.push({
          label: this.monthArray[item.month - 1],
          positive: parseInt(item.positive_value ? item.positive_value : 0, 10),
          negative: parseInt(item.negative_value ? item.negative_value : 0, 10)
        });
      }
      this.monthlyData = res;
      let monthPositiveAverage = 0;
      let monthNegativeAverage = 0;
      for (const item of res) {
        monthPositiveAverage += item.positive_value;
        monthNegativeAverage += item.negative_value;
      }
      this.averageData = {
        monthNegativeAverage,
        monthPositiveAverage,
        weekNegativeAverage: (monthNegativeAverage / 4),
        weekPositiveAverage: (monthPositiveAverage / 4)
      };
    });

    this.httpService.get(URL_JSON.APPOINTMENT + '/analysisTotalPatient/' + this.currentUser.id).subscribe((res: any) => {
      for (const data of res.per_patient) {
        this.lineChartData[0].series.push({
          name: this.monthArray[data.month_label - 1],
          value: data.patient_per_month
        });
      }
      this.dataPerPatient = res;
    });
  }

  selectAgency = id => {
    this.selectedAgency = id;
    this.analysisByAgency();
  }

  getNumberFromString = (value) => {
    return parseInt(value, 10);
  }

  getDate = time => {
    moment.locale('de');
    return moment(time).format('DD.MM.YYYY');
  }

  analysisByAgency = () => {
    this.httpService.get(URL_JSON.APPOINTMENT + '/analysisByAgency/' + this.currentUser.id + '?from=' +
      this.fromDate + '&to=' + this.toDate + '&agency=' + this.selectedAgency)
      .subscribe((res: any) => {
        this.data = [];
        if (!this.selectedAgency) {
          this.data.push({
            label: 'Termine gesamp',
            detailData: [
              {color: '#50E3C2', value: this.getNumberFromString(res.total.confirm_count), icon: 'done'},
              {color: '#F389CC', value: this.getNumberFromString(res.total.open_date_count), icon: 'feeling'},
              {color: '#E87C60', value: this.getNumberFromString(res.total.cancel_count), icon: 'close'},
              {color: '#89DF8C', value: this.getNumberFromString(res.total.success_count), icon: 'thumb-up'}
            ]
          });
        }

        for (const agency of res.agency) {
          this.data.push({
            label: agency.agencyName,
            detailData: [
              {color: '#50E3C2', value: this.getNumberFromString(agency.confirm_count), icon: 'done'},
              {color: '#F389CC', value: this.getNumberFromString(agency.open_date_count), icon: 'feeling'},
              {color: '#E87C60', value: this.getNumberFromString(agency.cancel_count), icon: 'close'},
              {color: '#89DF8C', value: this.getNumberFromString(agency.success_count), icon: 'thumb-up'}
            ]
          });
        }
      });
  }

  changeDateFrom = event => {
    const date = new Date(event.value);
    this.fromDate = date.getTime();
    this.analysisByAgency();
  }

  changeDateTo = event => {
    const date = new Date(event.value);
    this.toDate = date.getTime() + 86400 * 1000 * 2;
    this.analysisByAgency();
  }
}
