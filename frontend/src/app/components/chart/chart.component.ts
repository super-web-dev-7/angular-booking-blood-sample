import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() total;
  @Input() positive;
  @Input() negative;
  @Input() label;
  top1 = 0;
  top2 = 0;
  left1 = 0;
  left2 = 0;
  radius = 100;
  constructor() { }

  ngOnInit(): void {
    const reg = 2 * this.positive * 2 * Math.PI / this.total;
    this.top1 = (this.radius + 10) * (1 - Math.abs(Math.sin(reg))) - 25;
    this.left1 = (this.radius + 10) * (1 - Math.abs(Math.cos(reg))) - 25;
    this.top2 = (this.radius + 10) * (1 + Math.abs(Math.sin(reg)));
    this.left2 = (this.radius + 10) * (1 + Math.abs(Math.cos(reg)));
    console.log(this.top1, this.left1);
  }

}
