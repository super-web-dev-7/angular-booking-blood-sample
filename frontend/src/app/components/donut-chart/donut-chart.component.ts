import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  @Input() items;
  @Input() label;


  public total = 0;

  constructor() {
  }

  ngOnInit(): void {
    if (this.items.length > 0)
    {
      this.total = this.items.map(a => a.value).reduce((x, y) => x + y);
    }
    // for (const item of this.data) {
    //   this.total += item.value;
    // }
  }

  getPerimeter(radius: number): number
  {
    return Math.PI * 2 * radius;
  }

  getColor(index: number): string
  {
    return this.items[index].color;
  }

  getOffset(radius: number, index: number): number
  {
    let percent = 0;
    for (let i = 0; i < index; i++) {
      percent += ((this.items[i].value) / this.total);
    }
    // console.log(index, percent);
    const perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }

  getCx(index): number {
    let percentage = 0;
    for (let i = 0; i < index; i++) {
      percentage += ((this.items[i].value) / this.total);
    }
    const angle = (percentage + this.items[index].value / this.total / 2) * 2 * Math.PI;
    return 75 + 60 * Math.cos(angle);
  }

  getCy(index): number {
    let percentage = 0;
    for (let i = 0; i < index; i++) {
      percentage += ((this.items[i].value) / this.total);
    }
    const angle = (percentage + this.items[index].value / this.total / 2) * 2 * Math.PI;
    return 75 - 60 * Math.sin(angle);
  }

}
