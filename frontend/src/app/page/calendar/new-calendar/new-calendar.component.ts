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
