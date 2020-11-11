import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-step-third',
  templateUrl: './booking-step-third.component.html',
  styleUrls: ['./booking-step-third.component.scss']
})
export class BookingStepThirdComponent implements OnInit {

  packageNames = [
    'Männermedizin',
    'Gesundheits-Check-Up',
    'Corona',
    'Gutes Immunsystem',
    'Sexuelle Gesundheit',
    'Basis'
  ];
  selectedPackage = {
    id: 1,
    name: 'dddd'
  };
  paymentOptions = [
    {label: 'Heidelpay', value: 'alternative'},
    {label: 'Invoice', value: 'customerStore'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
