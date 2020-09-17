import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {curveCardinal} from 'd3-shape';

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
    [
      {color: '#50E3C2', value: 200, icon: 'done'},
      {color: '#F389CC', value: 75, icon: 'feeling'},
      {color: '#E87C60', value: 11, icon: 'close'},
      {color: '#89DF8C', value: 71, icon: 'thumb-up'}
    ],
    [
      {color: '#50E3C2', value: 160, icon: 'done'},
      {color: '#F389CC', value: 25, icon: 'feeling'},
      {color: '#E87C60', value: 11, icon: 'close'},
      {color: '#89DF8C', value: 41, icon: 'thumb-up'}
    ],
    [
      {color: '#50E3C2', value: 40, icon: 'done'},
      {color: '#F389CC', value: 50, icon: 'feeling'},
      {color: '#E87C60', value: 0, icon: 'close'},
      {color: '#89DF8C', value: 30, icon: 'thumb-up'}
    ]
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
  }

}
