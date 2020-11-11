import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-layout',
  templateUrl: './booking-layout.component.html',
  styleUrls: ['./booking-layout.component.scss']
})
export class BookingLayoutComponent implements OnInit {

  currentStep = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
