import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-icon',
  templateUrl: './order-icon.component.html',
  styleUrls: ['./order-icon.component.scss']
})
export class OrderIconComponent implements OnInit {

  @Input() columnName;
  @Input() orderStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
