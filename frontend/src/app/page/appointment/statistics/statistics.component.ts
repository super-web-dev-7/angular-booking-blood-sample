import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {curveCardinal} from 'd3-shape';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

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

  barChartData = [
    {positive: 16, negative: 5, label: 'März'},
    {positive: 11, negative: 12, label: 'April'},
    {positive: 8, negative: 3, label: 'Mai'},
    {positive: 14, negative: 10, label: 'Juni'},
    {positive: 10, negative: 15, label: 'Juli'},
    {positive: 12, negative: 10, label: 'August'}
  ];

  lineChartData = [
    {
      name: 'Patient',
      series: [
        {
          name: 'March',
          value: 10
        },
        {
          name: 'April',
          value: 13
        },
        {
          name: 'May',
          value: 15
        },
        {
          name: 'June',
          value: 17
        },
        {
          name: 'July',
          value: 12
        },
        {
          name: 'August',
          value: 21
        }
      ]
    },
  ];

  curve: any = curveCardinal;
  customColors = {
    domain: ['#FFF', '#FFF'],

  };

  constructor(
    public httpService: HttpService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'custom-calendar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/calendar.svg')
    );
  }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.APPOINTMENT + '/analysisByAgency').subscribe((res: any) => {
      this.data.push({
        label: 'Termine gesamp',
        detailData: [
          {color: '#50E3C2', value: this.getNumberFromString(res.total.confirm_count), icon: 'done'},
          {color: '#F389CC', value: this.getNumberFromString(res.total.open_date_count), icon: 'feeling'},
          {color: '#E87C60', value: this.getNumberFromString(res.total.cancel_count), icon: 'close'},
          {color: '#89DF8C', value: this.getNumberFromString(res.total.success_count), icon: 'thumb-up'}
        ]
      });
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

    this.httpService.get(URL_JSON.APPOINTMENT + '/analysisByPackage').subscribe((res: any) => {
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
  }

  getNumberFromString = (value) => {
    return parseInt(value, 10);
  }

}
