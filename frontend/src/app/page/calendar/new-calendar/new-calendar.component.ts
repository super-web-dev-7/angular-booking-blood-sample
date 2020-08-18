import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-calendar',
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.scss']
})
export class NewCalendarComponent implements OnInit {
  selectedDistrict = null;
  selectedNurse = null;
  districts = [
    {
      id: 1,
      name: 'Steglitz'
    },
    {
      id: 2,
      name: 'Charlottenburg'
    },
    {
      id: 3,
      name: 'Wilmersdorf'
    },
    {
      id: 4,
      name: 'Tempelhof'
    }
  ];
  nurses = [
    {
      id: 1,
      name: 'Maria Synowzik'
    },
    {
      id: 2,
      name: 'Karin Blattip'
    },
    {
      id: 3,
      name: 'Ernst Waltersdorf'
    }
  ];

  values = [
    {value: '1', viewValue: '10'},
    {value: '2', viewValue: '20'},
    {value: '3', viewValue: '30'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectDistrict = (id) => {
    this.selectedDistrict = id;
  }

  selectNurse = (id) => {
    this.selectedNurse = id;
  }

}
