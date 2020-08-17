import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  isAddAdminPopup = false;
  selectedAdmin = null;
  selectedCalendar = null;
  admins = [
    {
      id: 1,
      name: 'Torsten Günther'
    },
    {
      id: 2,
      name: 'Karsten Friedrich'
    },
    {
      id: 3,
      name: 'Laura Wilheminanski'
    },
    {
      id: 4,
      name: 'Friedolin Ernster'
    },
    {
      id: 5,
      name: 'Sandra Wandersland'
    }
  ];
  calendars = [
    {
      id: 1,
      name: 'Kalenderressource / ',
      range: 'Bezirk nicht ausgewählt'
    },
    {
      id: 2,
      name: 'Kalendergruppe 1',
      range: '14000 - 14999'
    },
    {
      id: 3,
      name: 'Kalendergruppe 2',
      range: '15000 - 16999'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  showAddAdminPopup = (event) => {
    this.isAddAdminPopup = !this.isAddAdminPopup;
  }

  selectAdmin = (id) => {
    this.selectedAdmin = id;
  }

  selectCalendar = (id) => {
    this.selectedCalendar = id;
  }
}
