import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

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
  packageLabelClass = ['light-green-color', 'pink-color', 'red-color', 'green-color', 'blue-color', 'yellow-color']

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
    console.log(this.packageTotal);
  }

}
