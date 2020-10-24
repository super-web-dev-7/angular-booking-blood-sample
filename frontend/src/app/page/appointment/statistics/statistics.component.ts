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

  packageLabel = ['Allgemeine Gesundheit', 'Frauenmedizin', 'Corona', 'Gutes Immunsystem', 'Männermedizin', 'Sexuelle Gesundheit'];
  packageLabelClass = ['light-green-color', 'pink-color', 'red-color', 'green-color', 'blue-color', 'yellow-color'];

  data = [
    // [
    //   {color: '#50E3C2', value: 200, icon: 'done'},
    //   {color: '#F389CC', value: 75, icon: 'feeling'},
    //   {color: '#E87C60', value: 11, icon: 'close'},
    //   {color: '#89DF8C', value: 71, icon: 'thumb-up'}
    // ],
    // [
    //   {color: '#50E3C2', value: 160, icon: 'done'},
    //   {color: '#F389CC', value: 25, icon: 'feeling'},
    //   {color: '#E87C60', value: 11, icon: 'close'},
    //   {color: '#89DF8C', value: 41, icon: 'thumb-up'}
    // ],
    // [
    //   {color: '#50E3C2', value: 40, icon: 'done'},
    //   {color: '#F389CC', value: 50, icon: 'feeling'},
    //   {color: '#E87C60', value: 0, icon: 'close'},
    //   {color: '#89DF8C', value: 30, icon: 'thumb-up'}
    // ]
  ];

  packageData = [
    {color: '#50E3C2', value: 50, icon: 'heart'},
    {color: '#F389CC', value: 26, icon: 'child'},
    {color: '#E87C60', value: 44, icon: 'corona'},
    {color: '#89DF8C', value: 12, icon: 'plus'},
    {color: '#4A90E2', value: 36, icon: 'direction'},
    {color: '#F5A623', value: 32, icon: 'fire'}
  ];

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
    for (const item of this.packageData) {
      this.packageTotal += item.value;
    }
    this.httpService.get(URL_JSON.APPOINTMENT + '/analysis').subscribe((res: any) => {
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
  }

  getNumberFromString = (value) => {
    return parseInt(value, 10);
  }

}
