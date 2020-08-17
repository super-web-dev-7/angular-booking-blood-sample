import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  selectedAllocation = null;
  selectedRole = null;
  allocations = [
    {
      id: 1,
      name: 'Keine'
    },
    {
      id: 2,
      name: 'Agentur 1'
    },
    {
      id: 3,
      name: 'Arbeitsgruppe 1'
    },
    {
      id: 4,
      name: 'Arbeitsgruppe 2'
    }
  ];
  roles = [
    {
      id: 1,
      name: 'Superadmin'
    },
    {
      id: 2,
      name: 'AG-Admin'
    },
    {
      id: 3,
      name: 'Schwester'
    },
    {
      id: 4,
      name: 'Arzt'
    }
  ];

  password;
  constructor() { }

  ngOnInit(): void {
  }

  selectAllocation = (id) => {
    this.selectedAllocation = id;
  }

  selectRole = (id) => {
    this.selectedRole = id;
  }

  generateRandomPassword = () => {
    this.password = Math.random().toString(36).slice(-8);
  }

}
