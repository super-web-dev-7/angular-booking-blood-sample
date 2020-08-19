import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  selectedGroup = null;
  selectedStatus = null;
  isActive = false;
  groups = [
    {
      id: 1,
      name: 'Arbeitsgruppe 1'
    },
    {
      id: 2,
      name: 'Arbeitsgruppe 2'
    },
    {
      id: 3,
      name: 'Arbeitsgruppe 3'
    }
  ];
  statuses = [
    {
      id: 1,
      name: 'Inaktiv'
    },
    {
      id: 2,
      name: 'Öffentlich'
    },
    {
      id: 3,
      name: 'Intern'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectGroup = (id) => {
    this.selectedGroup = id;
  }

  selectStatus = (id) => {
    this.selectedStatus = id;
  }

}
