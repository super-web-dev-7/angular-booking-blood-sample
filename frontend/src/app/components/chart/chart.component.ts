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
  constructor() { }

  ngOnInit(): void {
  }

}
