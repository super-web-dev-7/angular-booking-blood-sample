import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data;
  maxValue;

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      const tempData = [...this.data];
      tempData.sort((a, b) => {
        return b.positive - a.positive;
      });
      this.maxValue = tempData[0].positive;
      tempData.sort((a, b) => {
        return b.negative - a.negative;
      });
      if (this.maxValue < tempData[0].negative) {
        this.maxValue = tempData[0].negative;
      }
    }
  }
}
